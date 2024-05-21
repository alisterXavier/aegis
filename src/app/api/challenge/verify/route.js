const acme = require('acme-client');
import { TestCol, initClient, encryptKey } from '@/utils';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const generate_Certificate = async (id, url, client, order, altNames, salt) => {
  /* Finalize order */
  const [key, csr] = await acme.crypto.createCsr({
    commonName: url,
    altNames: altNames,
  });

  // const updated_order = await client.getOrder(order);

  const finalized = await client.finalizeOrder(order, csr);
  const cert = await client.getCertificate(finalized);

  await TestCol.updateOne(
    {
      _id: ObjectId.createFromHexString(id),
    },
    {
      $set: {
        dns: {
          'dns.challenges.$[elem].status': 'valid',
          certificates: {
            csr: encryptKey({ key: csr, st: salt }),
            private: encryptKey({ key: key, st: salt }),
            certificate: encryptKey({ key: cert, st: salt }),
          },
        },
      },
    },
    {
      arrayFilters: [{ 'elem.type': 'dns-01' }],
    }
    // {
    //   upsert: true,
    // }
  );
  /* Done */
  return {
    csr: csr.toString(),
    private: key.toString(),
    certificate: cert.toString(),
  };
};

export async function GET(req, context) {
  const id = req.nextUrl.searchParams.get('id');
  const user = await TestCol.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  const client = await initClient(id, undefined, user.accountUrl, undefined);

  const authz = user.dns;

  let challengeCompleted = false;

  try {
    const { challenges } = authz;
    /* Just select any challenge */
    const challenge = challenges.find((i) => i.type === 'dns-01');

    try {
      /* Verify that challenge is satisfied */
      await client.verifyChallenge(authz, challenge);

      /* Notify ACME provider that challenge is satisfied */
      await client.completeChallenge(challenge);

      challengeCompleted = true;

      // /* Wait for ACME provider to respond with valid status */
      await client.waitForValidStatus(challenge);
    } finally {
      console.log('Finally');
      /* Clean up challenge response */
      // try {
      //   await challengeRemoveFn(authz, challenge, keyAuthorization);
      // } catch (e) {
      //   /**
      //    * Catch errors thrown by challengeRemoveFn() so the order can
      //    * be finalized, even though something went wrong during cleanup
      //    */
      // }
    }
  } catch (e) {
    /* Deactivate pending authz when unable to complete challenge */
    if (!challengeCompleted) {
      try {
        NextResponse.json({ message: 'Auth Deactivation failed.' });
        // await client.deactivateAuthorization(authz);
      } catch (f) {
        NextResponse.json({ message: 'Auth Deactivation failed.' });
      }
    }
    NextResponse.json({ message: e, event: 403 });
    throw e;
  }

  const certs = await generate_Certificate(
    id,
    user.dns.identifier.value,
    client,
    user.order,
    [user.dns.identifier.value],
    user.salt
  );

  return NextResponse.json(certs);
  // return NextResponse.json(true)
}

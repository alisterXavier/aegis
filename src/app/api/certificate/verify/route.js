import {
  CertificateCol,
  decryptKey,
  initClient,
  PrivateKey,
} from '@/utils/server';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { generate_Certificate, Update_new_DNS_challenge } from '../functions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, context) {
  const id = req.nextUrl.searchParams.get('id');
  const {
    user: { _id, email },
  } = await getServerSession(authOptions);
  const certificate = await CertificateCol.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  const privateKey = decryptKey({
    encodedEncryptedPrivateKey: certificate.privateKey,
    encodedSalt: certificate.salt,
  });
  console.log(privateKey);
  const client = await initClient(
    _id,
    privateKey,
    certificate.accountUrl,
    email
  );

  // const authz = certificate.dns;

  // let challengeCompleted = false;

  // try {
  //   const { challenges } = authz;
  //   /* Just select any challenge */
  //   const challenge = challenges.find((i) => i.type === 'dns-01');

  //   try {
  //     /* Verify that challenge is satisfied */
  //     await client.verifyChallenge(authz, challenge);

  //     /* Notify ACME provider that challenge is satisfied */
  //     await client.completeChallenge(challenge);

  //     challengeCompleted = true;

  //     /* Wait for ACME provider to respond with valid status */
  //     await client.waitForValidStatus(challenge);
  //   } finally {
  //     console.log('Finally');
  //     /* Clean up challenge response */
  //     // try {
  //     //   await challengeRemoveFn(authz, challenge, keyAuthorization);
  //     // } catch (e) {
  //     //   /**
  //     //    * Catch errors thrown by challengeRemoveFn() so the order can
  //     //    * be finalized, even though something went wrong during cleanup
  //     //    */
  //     // }
  //   }
  // } catch (e) {
  //   /* Deactivate pending authz when unable to complete challenge */
  //   if (!challengeCompleted) {
  //     try {
  //       NextResponse.json({ message: 'Auth Deactivation failed.' });
  //       // await client.deactivateAuthorization(authz);
  //     } catch (f) {
  //       NextResponse.json({ message: 'Auth Deactivation failed.' });
  //     }
  //   }

  //   NextResponse.json({
  //     message: e,
  //     event: 403,
  //     message: 'New challenge added',
  //   });
  //   throw e;
  // }
  await Update_new_DNS_challenge(client, id, certificate.dns.identifier.value);

  // const certs = await generate_Certificate(
  //   id,
  //   certificate.dns.identifier.value,
  //   client,
  //   certificate.order,
  //   [certificate.dns.identifier.value],
  //   certificate.salt
  // );

  return NextResponse.json({ user });
}

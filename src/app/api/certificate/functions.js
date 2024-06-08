const acme = require('acme-client');
import { CertificateCol, encryptKey, initClient } from '@/utils/server';
import { ObjectId } from 'mongodb';

export const generate_Certificate = async (
  id,
  url,
  client,
  order,
  altNames,
  salt
) => {
  /* Finalize order */
  const [key, csr] = await acme.crypto.createCsr({
    commonName: url,
    altNames: altNames,
  });

  // const updated_order = await client.getOrder(order);

  const finalized = await client.finalizeOrder(order, csr);
  const cert = await client.getCertificate(finalized);

  await CertificateCol.updateOne(
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

export const getDNSChallenge = async (userId, privateKey, domain, email) => {
  const client = await initClient(userId, privateKey, undefined, email);

  /* Place new order */
  const order = await client.createOrder({
    identifiers: [{ type: 'dns', value: domain }],
  });

  const authorizations = await client.getAuthorizations(order);

  const challenge = authorizations[0].challenges.find(
    (i) => i.type === 'dns-01'
  );
  const keyAuthorization = await client.getChallengeKeyAuthorization(challenge);

  return {
    ...authorizations,
    accountUrl: client.getAccountUrl(),
    order: order,
    keyAuthorization: keyAuthorization,
  };
};

export const Update_new_DNS_challenge = async (client, certId, domain) => {
    
  /* Place new order */
  const order = await client.createOrder({
    identifiers: [{ type: 'dns', value: domain }],
  });

  const authorizations = await client.getAuthorizations(order);

  const challenge = authorizations[0].challenges.find(
    (i) => i.type === 'dns-01'
  );
  const keyAuthorization = await client.getChallengeKeyAuthorization(challenge);

  await CertificateCol.updateOne(
    {
      _id: ObjectId.createFromHexString(certId),
    },
    {
      $set: {
        ...authorizations,
        accountUrl: client.getAccountUrl(),
        order: order,
        key_authorization: keyAuthorization,
      },
    }
  );
};

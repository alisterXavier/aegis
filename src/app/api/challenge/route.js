import { NextResponse } from 'next/server';
import { TestCol, initClient, PrivateKey, encryptKey } from '@/utils';

const getDNSChallenge = async (userId, privateKey, domain, email) => {
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

export async function POST(req, context) {
  const id = req.nextUrl.searchParams.get('id');
  const userId = req.nextUrl.searchParams.get('id');
  const domain = req.nextUrl.searchParams.get('domain');
  const email = req.nextUrl.searchParams.get('email');

  const privateKey = await PrivateKey(id);
  const DNS_Auth = await getDNSChallenge(id, privateKey, domain, email);

  const now = new Date();
  const bsonDateUtc = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );

  const { encodedEncryptedPrivateKey, encodedSalt } = encryptKey({
    key: privateKey,
  });
  await TestCol.insertOne({
    dns: { ...DNS_Auth[0] },
    privateKey: encodedEncryptedPrivateKey,
    salt: encodedSalt,
    accountUrl: DNS_Auth.accountUrl,
    order: DNS_Auth.order,
    dateAdded: bsonDateUtc,
    key_authorization: DNS_Auth.keyAuthorization,
  });

  await TestCol.updateOne(
    {
      _id: ObjectId.createFromHexString(userId),
    },
    {
      $push:{
          certificates_issued: data.insertedId
      }
    }
  );

  return NextResponse.json({
    status: 200,
  });
}

export async function GET(req) {
  const data = await TestCol.find({}).toArray();
  return NextResponse.json({ ...data });
}

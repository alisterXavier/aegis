import { NextResponse } from 'next/server';
import {
  CertificateCol,
  PrivateKey,
  encryptKey,
  UserCol,
} from '@/utils/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import { getDNSChallenge } from './functions';

export async function POST(req, res) {
  // const user_id = req.nextUrl.searchParams.get('user_id');
  const {
    user: { _id },
  } = await getServerSession(authOptions);
  const domain = req.nextUrl.searchParams.get('domain');
  const email = req.nextUrl.searchParams.get('email');
  const privateKey = await PrivateKey(_id);
  const DNS_Auth = await getDNSChallenge(_id, privateKey, domain, email);

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
  const data = await CertificateCol.insertOne({
    dns: { ...DNS_Auth[0] },
    privateKey: encodedEncryptedPrivateKey,
    salt: encodedSalt,
    accountUrl: DNS_Auth.accountUrl,
    order: DNS_Auth.order,
    dateAdded: bsonDateUtc,
    key_authorization: DNS_Auth.keyAuthorization,
  });

  await UserCol.updateOne(
    {
      _id: ObjectId.createFromHexString(_id),
    },
    {
      $push: {
        certificates_issued: data.insertedId.toJSON(),
      },
    }
  );

  return NextResponse.json({
    _id: newItem.insertedId,
    status: 200,
  });
}

export async function DELETE(req, res) {
  const id_list_from_req = req.nextUrl.searchParams.get('id_list');
  const id_list = id_list_from_req.split(',');
  const {
    user: { _id },
  } = await getServerSession(authOptions);

  try {
    await CertificateCol.deleteMany({
      _id: {
        $in: id_list.map((i) => ObjectId.createFromHexString(i)),
      },
    });

    await UserCol.updateOne(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $pull: {
          certificates_issued: { $in: id_list },
        },
      }
    );
    console.log();
  } catch (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({
    status: 200,
  });
}

export async function GET(req) {
  const data = await CertificateCol.find({}).toArray();
  return NextResponse.json({ ...data });
}

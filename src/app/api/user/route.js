import { NextResponse } from 'next/server';
import { encryptKey, UserCol } from '@/utils/server';

export async function POST(req) {
  const { email, password } = await req.json();
  const { encodedEncryptedPrivateKey, encodedSalt } = encryptKey({
    key: password,
  });
  const user = await UserCol.insertOne({
    email,
    password: {
      encodedEncryptedPrivateKey,
      encodedSalt,
    },
    privKey: 'typewriter',
    certificates_issued: [],
  });
  return NextResponse.json(user);
}

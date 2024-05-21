import { NextResponse } from 'next/server';
import { UserCol } from '@/utils';

export async function POST(req) {
  const data = await req.json();

  const user = UserCol.insertOne({
    email: data.email,
    certificates_issued: [],
  });

  NextResponse.json(user);
}

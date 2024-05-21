import { NextResponse } from 'next/server';
import { TestCol } from '@/utils';
import { ObjectId } from 'mongodb';

export async function DELETE(req, context) {
  const id = req.nextUrl.searchParams.get('id');
  const data = await TestCol.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
  return NextResponse.json({ ...data });
}

export async function GET(req, context) {
  const id = req.nextUrl.searchParams.get('id');
  const data = await TestCol.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  return NextResponse.json({
    record: `_acme-challenge.${data.identifier.value}`,
    token: data.key_authorization,
    cert: data.dns.certificates.cert,
    csr: data.dns.certificates.csr,
    key: data.dns.certificates.private,
    status: data.status,
    expires: data.expires,
  });
}

export async function PUT(req, context) {
  await TestCol.updateOne(
    {
      _id: ObjectId.createFromHexString('662d695508ec0263881837a6'),
    },

    {
      $set: {
        cert: 'asdas',
      },
    }
  );
  NextResponse.json(true);
}

import { NextResponse } from 'next/server';
import { SSH2connection } from '../sftp';

export async function GET(req, res) {
  const os = req.nextUrl.searchParams.get('os');
  const domain = req.nextUrl.searchParams.get('domain');

  const remoteTask = SSH2connection(
    '192.168.75.128',
    'kali',
    'kali',
    os,
    'apache',
    domain
  );

  (await remoteTask).execCommands();

  return NextResponse.json({ status: 200 });
}

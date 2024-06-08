const dns = require('dns');
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const url_list = req.nextUrl.searchParams.get('url_list');
  const url = url_list.split(',');
  url.map(async (i) => {
    dns.lookup(i, (err, address) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log(`The IP address of ${i} is:`, address);
      }
    });
  });
  return NextResponse.json({
    status: 200,
  });
}

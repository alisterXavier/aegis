import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';
import { UserCol } from '@/utils';
import axios from 'axios';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callabcks: {
    async signIn({ user, account }) {
      if (account.provider === 'goolge') {
        const { name, email } = user;

        try {
          const userExists = UserCol.findOne({ email: email });

          if (!userExists) {
            const res = await axios.post('/api/user', {
              name: name,
              email: email,
            });

            return res;
          }
        } catch (e) {
          return e;
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

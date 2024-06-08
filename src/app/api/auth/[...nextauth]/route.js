import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { CertificateCol, decryptKey, UserCol } from '@/utils/server';

const certs = [
  {
    _id: '6651fd662c15e744ba2202d9',
    automatic: true,
    dns: {
      identifier: { type: 'dns', value: 'ubuntu.xavier404.cloud' },
      status: 'pending',
      expires: '2024-07-06T15:34:57Z',
      challenges: [
        {
          type: 'http-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/eGjNdA',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'dns-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/C-TQyg',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'tls-alpn-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/td8Lzw',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
      ],
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
    },
    privateKey:
      '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',
    salt: 'IQRu95rsDaR4zYUcyk9jlQ==',
    accountUrl:
      'https://acme-staging-v02.api.letsencrypt.org/acme/acct/146400324',
    order: {
      status: 'pending',
      expires: '2024-05-06T15:34:57Z',
      identifiers: [{ type: 'dns', value: 'ubuntu.xavier404.cloud' }],
      authorizations: [
        'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
      ],
      finalize:
        'https://acme-staging-v02.api.letsencrypt.org/acme/finalize/146400324/16222485484',
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/order/146400324/16222485484',
    },
    dateAdded: { $date: { $numberLong: '1714390499708' } },
    key_authorization: 'IoMV4F9BttEZG2GEKDx6wH6tYg5Vyvl5wy_xyvDZtIU',
    DomainConfigCompletion: true,
    SSlCertificatesUploaded: false,
    CommandsExecuted: false,
    SSLConfigCompletion: false,
    automatic: true,
  },
  {
    _id: '6653693ac5249e7fbb5cfd6a',
    automatic: false,
    dns: {
      identifier: { type: 'dns', value: 'centos.xavier404.cloud' },
      status: 'pending',
      expires: '2024-05-07T06:18:29Z',
      challenges: [
        {
          type: 'http-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12192970464/IVEsLw',
          token: 'ADKD3PPS_yGpM3rtgjce5l-ouHk_1BXMRRNgREkGItU',
        },
        {
          type: 'dns-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12192970464/OSUeww',
          token: 'ADKD3PPS_yGpM3rtgjce5l-ouHk_1BXMRRNgREkGItU',
        },
        {
          type: 'tls-alpn-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12192970464/rPDy8g',
          token: 'ADKD3PPS_yGpM3rtgjce5l-ouHk_1BXMRRNgREkGItU',
        },
      ],
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12192970464',
    },
    DomainConfigCompletion: true,
    SSlCertificatesUploaded: true,
    CommandsExecuted: true,
    SSLConfigCompletion: true,
    privateKey:
      '53Qep99vMgeccw1gOrYuGan5VK4UKAteqnCTUD63o+nFFFhTpxWbn4AMK+T3dY0aGKPNpQ5gJ1kTscgQWCzrTvoPzSLxzwWDHvANTftnDJx8apUwhlmG77Z4pWi8kdCxJnD0qXHVtGh5AS6UVGJfpd1vOAWZvp9A8LlrXA4M1JTjjCKQp5/0cMSKDDQqhEMloVAFT9IoIQWS/NGECcFP4AdrPKB5sDO9ggWzOipePCje5WPclxUF0nU+j5qv4LsagrwFG704vsgHOzRPaVsV4bN27AVbBb2+G13C6d2koyfRQxhnnMJYgST/2tiYi3jnrcs6HSSpjjaILLjbDEjEflaq1h+cj7vEt/KocwLIaBhlT2obtjUAWMtniG9lO8d4qfoGZQkrvVTMH+58r3y6GTkPQ0R5wA2KBU0Yk36el5aMumviLNtr+PSg9c5FtFGicur/7B3/jxWhn9wnlVUt845H8RaxngMFovu+aCiMHDTxkmEEab52FRdCiKHP9w23JzdUZYWy5yq03gYHZ2/NEto7awj2JyY+hce24vMTgG4TaLOpjc4SJG709QaXPpgsGpusvEpNxrdcOoccZjwbLhJUpSqN+wD8IkZ4BfdeoJQCC+PFJImFLFiW7AStYBGctCTqCT2pC2hsPifdVdX/oB6wy44buY/GU3R1VItBN0fgtBwSl0yyRXZrt9ac9Nlq7jTpsxcgdAkQmpFtQznrcIJFAhJ+7QF3OMVuUst5vQurTXqBlwHUdYW84AnN16EsX4siVccxPx46EG/JZUCYR21hAPsklUxKA3DSvqVbpTklmOba0V0asjty50EC20SJUxysdopUkD9rKKazNF2AtU0Q5IxHk7xyUnwjmGBLESmqaBPWwEwPbnbcOLBrnTgTM+oEMrOstTf9bUt44oar758DlSSrsId703o2vi0sE+PA/ksrhClO/o7QhOL/VWuGsrpzefvFMyblnKrN2K7qoAwwo73aL/Snn5gmP7wsS+/nIcPXdNfDhSK8L/LIaBhlT2obtjUAWMtniG9lO8d4qfoGZQrv3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlq7jTpsxRlO8W3pbNlO8W3pbNlq7jTpsxRlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3pbNlO8W3',
  },
  {
    _id: '6651fd662c15e744ba2202d9',
    automatic: false,
    dns: {
      identifier: { type: 'dns', value: 'suse.xavier404.cloud' },
      status: 'pending',
      expires: '2024-05-06T15:34:57Z',
      challenges: [
        {
          type: 'http-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/eGjNdA',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'dns-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/C-TQyg',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'tls-alpn-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/td8Lzw',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
      ],
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
    },
    privateKey:
      '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',
    salt: 'IQRu95rsDaR4zYUcyk9jlQ==',
    accountUrl:
      'https://acme-staging-v02.api.letsencrypt.org/acme/acct/146400324',
    order: {
      status: 'pending',
      expires: '2024-05-06T15:34:57Z',
      identifiers: [{ type: 'dns', value: 'ubuntu.xavier404.cloud' }],
      authorizations: [
        'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
      ],
      finalize:
        'https://acme-staging-v02.api.letsencrypt.org/acme/finalize/146400324/16222485484',
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/order/146400324/16222485484',
    },
    dateAdded: new Date(),
    key_authorization: 'IoMV4F9BttEZG2GEKDx6wH6tYg5Vyvl5wy_xyvDZtIU',
  },
  {
    _id: '6651fd662c15e744ba2202d9',
    automatic: false,
    dns: {
      identifier: { type: 'dns', value: 'suse.xavier404.cloud' },
      status: 'valid',
      expires: '2024-05-06T15:34:57Z',
      challenges: [
        {
          type: 'http-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/eGjNdA',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'dns-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/C-TQyg',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'tls-alpn-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/td8Lzw',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
      ],
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
    },
    privateKey:
      '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',
    salt: 'IQRu95rsDaR4zYUcyk9jlQ==',
    accountUrl:
      'https://acme-staging-v02.api.letsencrypt.org/acme/acct/146400324',
    order: {
      status: 'pending',
      expires: '2024-05-06T15:34:57Z',
      identifiers: [{ type: 'dns', value: 'ubuntu.xavier404.cloud' }],
      authorizations: [
        'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
      ],
      finalize:
        'https://acme-staging-v02.api.letsencrypt.org/acme/finalize/146400324/16222485484',
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/order/146400324/16222485484',
    },
    dateAdded: new Date(),
    key_authorization: 'IoMV4F9BttEZG2GEKDx6wH6tYg5Vyvl5wy_xyvDZtIU',
  },
  {
    _id: '6651fd662c15e744ba2202d9',
    automatic: true,
    dns: {
      identifier: { type: 'dns', value: 'suse.xavier404.cloud' },
      status: 'valid',
      expires: '2024-05-06T15:34:57Z',
      challenges: [
        {
          type: 'http-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/eGjNdA',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'dns-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/C-TQyg',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'tls-alpn-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/td8Lzw',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
      ],
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
    },
    privateKey:
      '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',
    salt: 'IQRu95rsDaR4zYUcyk9jlQ==',
    accountUrl:
      'https://acme-staging-v02.api.letsencrypt.org/acme/acct/146400324',
    order: {
      status: 'pending',
      expires: '2024-05-06T15:34:57Z',
      identifiers: [{ type: 'dns', value: 'ubuntu.xavier404.cloud' }],
      authorizations: [
        'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
      ],
      finalize:
        'https://acme-staging-v02.api.letsencrypt.org/acme/finalize/146400324/16222485484',
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/order/146400324/16222485484',
    },
    dateAdded: new Date(),
    key_authorization: 'IoMV4F9BttEZG2GEKDx6wH6tYg5Vyvl5wy_xyvDZtIU',
  },
  {
    _id: '6651fd662c15e744ba2202d9',
    automatic: false,
    dns: {
      identifier: { type: 'dns', value: 'suse.xavier404.cloud' },
      status: 'valid',
      expires: '2024-05-06T15:34:57Z',
      challenges: [
        {
          type: 'http-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/eGjNdA',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'dns-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/C-TQyg',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
        {
          type: 'tls-alpn-01',
          status: 'pending',
          url: 'https://acme-staging-v02.api.letsencrypt.org/acme/chall-v3/12186751234/td8Lzw',
          token: 'Cuy3w2fbcjh4fJN2YuGX_Pa18ruZ-PVLtX8zeeDVacw',
        },
      ],
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
    },
    privateKey:
      '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',
    salt: 'IQRu95rsDaR4zYUcyk9jlQ==',
    accountUrl:
      'https://acme-staging-v02.api.letsencrypt.org/acme/acct/146400324',
    order: {
      status: 'pending',
      expires: '2024-05-06T15:34:57Z',
      identifiers: [{ type: 'dns', value: 'ubuntu.xavier404.cloud' }],
      authorizations: [
        'https://acme-staging-v02.api.letsencrypt.org/acme/authz-v3/12186751234',
      ],
      finalize:
        'https://acme-staging-v02.api.letsencrypt.org/acme/finalize/146400324/16222485484',
      url: 'https://acme-staging-v02.api.letsencrypt.org/acme/order/146400324/16222485484',
    },
    dateAdded: new Date(),
    key_authorization: 'IoMV4F9BttEZG2GEKDx6wH6tYg5Vyvl5wy_xyvDZtIU',
  },
];
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          // const user = await UserCol.findOne({ email });

          // if (!user) return null;

          // const passwordMatch =
          //   password ===
          //   decryptKey({
          //     encodedEncryptedPrivateKey:
          //       user.password.encodedEncryptedPrivateKey,
          //     encodedSalt: user.password.encodedSalt,
          //   });

          // if (!passwordMatch) return null;
          const user = {
            _id: '6651fd182c15e744ba2202d8',
            email: 'wojenec170@qiradio.com',
            password: {
              encodedEncryptedPrivateKey: '3kqT6YQtsNrE9TpwwtuOAg==',
              encodedSalt: '42RaUTPX8VC1SZ+d/1tZ5Q==',
            },
            certificates_issued: [
              '6651fd662c15e744ba2202d9',
              '6653693ac5249e7fbb5cfd6a',
            ],
          };

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.id = user._id.toJSON();
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },
    async signIn({ user, account }) {
      // if (account.provider === 'google') {
      //   const { name, email } = user;
      //   try {
      //     const userExists = UserCol.findOne({ email: email });

      //     if (!userExists) {
      //       const res = await axios.post('/api/user', {
      //         name: name,
      //         email: email,
      //       });

      //       return res;
      //     }
      //   } catch (e) {
      //     return e;
      //   }
      // } else if (account.provider === 'credentials')
      return user;
    },
    async session({ session, token }) {
      // const user = await UserCol.findOne({ email: session.user.email });
      // const certs = await Promise.all(
      //   user.certificates_issued.map(async (i) => {
      //     const single = await CertificateCol.findOne({
      //       _id: ObjectId.createFromHexString(i),
      //     });
      //     return { _id: i, ...single };
      //   })
      // );
      // if (user) {
      // session.user._id = user._id.toJSON();
      // session.certificates = certs;
      session.user._id = '6651fd182c15e744ba2202d8';
      session.certificates = certs;
      // }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

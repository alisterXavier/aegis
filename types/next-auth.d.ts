import 'next-auth';

declare module 'next-auth' {
  interface Session {
    token: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
    certificates: Certificate[];
  }
}

export type Certificate = {
  _id: string;
  accountUrl: string;
  dateAdded: string;
  key_authorization: string;
  dns: {
    identifier: {
      type: string;
      value: string;
    };
    status: string;
    expires: string;
    challenges: { status: string; token: string; type: string; url: string }[];
    _id: string;
  };
  order: {
    status: string;
    expires: string;
    identifiers: { type: string; value: string }[];
    authorizations: string[];
    finalize: string;
  };
  privateKey: string;
  salt: string;
  DomainConfigCompletion: boolean;
  SSlCertificatesUploaded: boolean;
  CommandsExecuted: boolean;
  SSLConfigCompletion: boolean;
  automatic: boolean;
};

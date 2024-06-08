import { MongoClient, ServerApiVersion } from 'mongodb';

const client = await new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}).connect();

export const db = client.db('Aegis');
export const CertificateCol = db.collection('Certificates');
export const UserCol = db.collection('Users');

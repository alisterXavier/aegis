import { MongoClient, ServerApiVersion } from 'mongodb';

const client = await new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}).connect();

export const db = client.db('Aegis-SSL-Cert404');
export const TestCol = db.collection('Test');
export const UserCol = db.collection('Users');

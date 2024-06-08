const acme = require('acme-client');
import { ObjectId } from 'mongodb';
import { decryptKey, encryptKey, UserCol } from '..';

export const PrivateKey = async (userId) => {
  var user;
  if (userId)
    user = await UserCol.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

  const key = await acme.crypto.createPrivateKey();

  return key;
};

export const initClient = async (
  userId,
  privateKey,
  url = undefined,
  email = undefined
) => {
  const priv = privateKey;
  const acmeClient = new acme.Client(
    url
      ? {
          directoryUrl: acme.directory.letsencrypt.staging,
          accountKey: priv,
          accountUrl: url,
        }
      : {
          directoryUrl: acme.directory.letsencrypt.staging,
          accountKey: priv,
        }
  );

  if (!userId)
    await acmeClient.createAccount({
      termsOfServiceAgreed: true,
      contact: [`mailto:${email}`],
    });

  return acmeClient;
};

acme.setLogger((message) => {
  console.log(message);
});

const acme = require('acme-client');
import { ObjectId } from 'mongodb';
import { decryptKey, UserCol } from '../';

export const PrivateKey = async (userId) => {
  var user;
  if (userId)
    user = await UserCol.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

  if (!user) {
    return await acme.crypto.createPrivateKey();
  }
  
  return decryptPrivateKey(user.privateKey, user.salt);
};

export const initClient = async (
  userId,
  privateKey = undefined,
  url = undefined,
  email = undefined
) => {
  var priv;

  if (!privateKey && userId) priv = await PrivateKey(userId);
  else priv = privateKey;

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

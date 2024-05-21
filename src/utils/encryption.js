const crypto = require('crypto');

export function encryptKey({ key, password = 'typewriter', st = undefined }) {
  var salt = st;

  if (!salt)
    // Generate a random salt
    salt = crypto.randomBytes(16);

  // Derive a key from the password and salt using PBKDF2
  const secretKey = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

  // Encrypt the private key using AES-256-ECB
  const cipher = crypto.createCipheriv('aes-256-ecb', secretKey, null);
  let encryptedPrivateKey = cipher.update(key, 'utf8', 'hex');

  encryptedPrivateKey += cipher.final('hex');

  // Encode the salt and encrypted private key to Base64
  const encodedSalt = salt.toString('base64');
  const encodedEncryptedPrivateKey = Buffer.from(
    encryptedPrivateKey,
    'hex'
  ).toString('base64');

  return { encodedEncryptedPrivateKey, encodedSalt };
}

export function decryptKey(
  encodedEncryptedPrivateKey,
  encodedSalt,
  password = 'typewriter'
) {
  // Decode the salt and encrypted private key from Base64
  const salt = Buffer.from(encodedSalt, 'base64');
  const encryptedPrivateKey = Buffer.from(
    encodedEncryptedPrivateKey,
    'base64'
  ).toString('hex');

  // Derive a key from the password and salt using PBKDF2
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  // Decrypt the private key using AES-256-ECB
  const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
  let decryptedPrivateKey = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
  decryptedPrivateKey += decipher.final('utf8');

  return decryptedPrivateKey;
}

/**!
 * Sign a request by the specified method.
 *
 * @see https://nodejs.org/api/buffer.html#buffers-and-character-encodings
 * @see https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options
 * @see https://nodejs.org/api/crypto.html#hmacdigestencoding
 * @see https://nodejs.org/api/crypto.html#hmacupdatedata-inputencoding
 * @see https://www.npmjs.com/package/jsonwebtoken
 * @module lib/authentication
 */

import nodeCrypto from 'node:crypto';
import jsonwebtoken from 'jsonwebtoken';
import { AUTH } from './constants.mjs';

export const blind = (secret, hidden = 'full', visibility = 2) => {
  const output = {
    full: '****************',
    mask:
      secret.slice(0, visibility) +
      secret.slice(visibility, -visibility).replace(/.|\n/g, '*') +
      secret.slice(-visibility),
    none: secret,
  }[hidden];

  return output;
};

/**
 * Sign a request by Hash-based Message Authentication Code.
 */
export const signHmac = (encoding, payload, secret, key) => {
  const nonce = nodeCrypto.createHmac('sha256', secret).update(payload),
    digest = nonce.digest(encoding);

  global.apiTools.output[AUTH.SECURITY.HMAC] = {
    digest: blind(digest, 'mask'),
    encoding,
    payload: payload.split(key).join(blind(key, 'mask')),
    secret: blind(secret, 'mask'),
  };

  return digest;
};

/**
 * Sign a request by JSON Web Token.
 */
export const signJwt = (encoding, payload, secret, key) => {
  const nonce = nodeCrypto.randomBytes(16).toString(encoding),
    token = jsonwebtoken.sign(payload, secret, {
      algorithm: 'ES256',
      header: {
        kid: key,
        nonce,
      },
    });

  global.apiTools.output[AUTH.SECURITY.JWT] = {
    encoding,
    key: blind(key, 'mask'),
    payload: {
      ...payload,
      sub: blind(key, 'mask'),
    },
    secret: blind(secret),
    token: blind(token),
  };

  return token;
};

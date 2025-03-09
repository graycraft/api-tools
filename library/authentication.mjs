/**!
 * Sign a request by the specified method with blinding confidential data from output.
 *
 * @see https://nodejs.org/api/buffer.html#buffers-and-character-encodings
 * @see https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options
 * @see https://nodejs.org/api/crypto.html#hmacdigestencoding
 * @see https://nodejs.org/api/crypto.html#hmacupdatedata-inputencoding
 * @see https://www.npmjs.com/package/jsonwebtoken
 * @typedef {NodeJS.ArrayBufferView | string} BinaryLike
 * @typedef {Object<string, string>} Dict
 * @module library/authentication
 */

import nodeCrypto from 'node:crypto';

import jsonwebtoken from 'jsonwebtoken';

import { AUTH } from './constants.mjs';

const { ALGORITHM, SECURITY } = AUTH;

/**
 * Replace characters in a confidential data (key, secret, etc.) with asterisks.
 * @param {string} confidential Confidential data string.
 * @param {number} [visibility] Amount of characters leave to be visible at both sides of string.
 * @returns {string} Blinded confidential data.
 */
export const blind = (confidential, visibility = 2) => {
  let blinded;

  if (visibility) {
    blinded =
      confidential.slice(0, visibility) +
      confidential.slice(visibility, -visibility).replace(/.|\n/g, '*') +
      confidential.slice(-visibility);
  } else {
    blinded = '*'.repeat(16);
  }

  return blinded;
};

/**
 * Sign a request by Hash-based Message Authentication Code.
 * @param {"hex"} encoding Encoding of signature.
 * @param {string} payload Payload to sign.
 * @param {string} secret Private key.
 * @param {string} key Public key.
 * @returns {string} HMAC digest.
 */
export const signHmac = (encoding, payload, secret, key) => {
  const nonce = nodeCrypto
      .createHmac(ALGORITHM.SHA256, secret)
      .update(/** @type {BinaryLike} */ (payload)),
    digest = nonce.digest(encoding);

  global.apiTools.output[SECURITY.HMAC] = {
    digest: blind(digest),
    encoding,
    payload: payload.split(key).join(blind(key)),
    secret: blind(secret),
  };

  return digest;
};

/**
 * Sign a request by JSON Web Token.
 * @param {"hex"} encoding Encoding of signature.
 * @param {{
 *   exp: number;
 *   iss: string;
 *   nbf: number;
 *   sub: string;
 *   uri?: string;
 * }} payload Payload to sign.
 * @param {string} secret Private key.
 * @param {string} key Public key.
 * @returns {string} JSON Web Token.
 */
export const signJwt = (encoding, payload, secret, key) => {
  const nonce = nodeCrypto.randomBytes(16).toString(encoding),
    token = jsonwebtoken.sign(payload, secret, {
      algorithm: ALGORITHM.ES256,
      header: {
        kid: key,
        nonce,
      },
    });

  global.apiTools.output[SECURITY.JWT] = {
    encoding,
    key: blind(key),
    payload: {
      ...payload,
      sub: blind(key),
    },
    secret: blind(secret),
    token: blind(token),
  };

  return token;
};

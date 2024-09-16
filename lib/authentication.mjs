/**
 * Sign a request by various methods.
 * 
 * @module lib/authentication
 * @see https://nodejs.org/api/buffer.html#buffers-and-character-encodings
 * @see https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options
 * @see https://nodejs.org/api/crypto.html#hmacdigestencoding
 * @see https://nodejs.org/api/crypto.html#hmacupdatedata-inputencoding
 * @see https://www.npmjs.com/package/jsonwebtoken
 */

import nodeCrypto from "node:crypto";
import jsonwebtoken from "jsonwebtoken";
import { dirObject } from "./output.mjs";

/**
 * Sign a request with Hash-based Message Authentication Code.
 */
export const signHmac = (encoding, payload, secret, hidden) => {
  const nonce = nodeCrypto.createHmac("sha256", secret).update(payload),
    digest = nonce.digest(encoding);

  dirObject("HMAC", {
    digest,
    encoding,
    nonce,
    payload,
    secret: hide(secret, hidden),
  });

  return digest
};

/**
 * Sign a request with JSON Web Token.
 */
export const signJwt = (encoding, payload, secret, key) => {
  const nonce = nodeCrypto.randomBytes(16).toString(encoding),
    token = jsonwebtoken.sign(
      payload,
      secret,
      {
        algorithm: "ES256",
        header: {
          kid: key,
          nonce,
        },
      }
    );

  dirObject("JWT", {
    encoding,
    key,
    nonce,
    payload,
    secret: hide(secret),
    token: hide(token),
  });

  return token
};

export const hide = (secret, hidden = "full", visibility = 2) => {
  const output = {
    "full": "****************",
    "mask": secret.slice(0, visibility) +
      secret.slice(visibility, -visibility).replace(/.|\n/g, "*") +
      secret.slice(-visibility),
    "none": secret
  }[hidden];

  return output
};

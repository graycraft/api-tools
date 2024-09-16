/**
 * Sign GET request with JSON Web Token for Coinbase Advanced API and send.
 *
 * @see https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options
 * @see https://nodejs.org/api/crypto.html#hmacdigestencoding
 * @see https://nodejs.org/api/crypto.html#hmacupdatedata-inputencoding
 * @module coinbase/jwt_get
 */

import crypto from "node:crypto";
import jsonwebtoken from "jsonwebtoken";

const data = {
    order_status: "OPEN",
    product_id: "SOL-USDT"
  },
  hostname = "api.coinbase.com",
  key = "********",
  method = "GET",
  path = "/api/v3/brokerage/orders/historical/batch",
  query = "?" + String(new URLSearchParams(data)),
  secret = "********",
  timestamp = Date.now(),
  url = "https://" + hostname + path + query,
  nonce = crypto.randomBytes(16).toString("hex"),
  payload = {
    exp: Math.floor(timestamp / 1_000) + 120,
    iss: "cdp",
    nbf: Math.floor(timestamp / 1_000),
    sub: key,
    uri: method + " " + hostname + path,
  },
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

console.log("Fetching\u2026");
fetch(url, {
  headers: {
    Authorization: "Bearer " + token,
  },
  method,
})
  .then((response) => response.text())
  .then((text) =>
    {
      console.log("request:", {
        data,
        hostname,
        key,
        method,
        nonce,
        path,
        payload,
        query,
        secret,
        timestamp,
        token,
        url
      });
      console.dir(JSON.parse(text), { depth: null })
    }
  );

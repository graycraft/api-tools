/**
 * Sign POST request with JSON Web Token for Coinbase Advanced API and send.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 * @module coinbase/fetch_post
 */

import crypto from "node:crypto";
import jsonwebtoken from "jsonwebtoken";

const data = {
    client_order_id: crypto.randomUUID(),
    order_configuration: {
      limit_limit_gtc: {
        base_size: "0.01",
        limit_price: "1000"
      }
    },
    product_id: "BTC-USDT",
    retail_portfolio_id: "00000000-0000-000000000-000000000000",
    side: "BUY"
  },
  body = JSON.stringify(data),
  hostname = "api.coinbase.com",
  key = "********",
  method = "POST",
  path = "/api/v3/brokerage/orders",
  secret = "********",
  timestamp = Date.now(),
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

fetch("https://" + hostname + path, {
  body,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
  method,
})
  .then((response) => response.text())
  .then((text) =>
    {
      console.log("request:", {
        body,
        data,
        hostname,
        key,
        method,
        nonce,
        path,
        payload,
        secret,
        timestamp,
        token,
      });
      console.dir(JSON.parse(text), { depth: null })
    }
  );

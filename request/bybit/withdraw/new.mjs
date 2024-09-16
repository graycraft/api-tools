/**
 * Bybit API wallet withdraw endpoint.
 * 
 * @module request/bybit/wallet/withdraw
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { throwRequired, warnOptional } from "../../../lib/output.mjs";
import bybitPost from "../post.mjs";

const {
    PATH: {
      WITHDRAW_NEW
    },
  } = config,
  {
    address: {
      withdraw
    },
    authentication: {
      sign
    },
    currency: {
      base,
      network,
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw
 */
const withdrawNew = (amount, coin, address, chain) => {
  const data = {
    address: withdraw,
    chain: network,
    coin: base,
    timestamp: Date.now()
  };

  if (typeof amount === "string")
    data.amount = amount
  else throwRequired(PATH, WITHDRAW_NEW, "amount");
  if (address) {
    if (typeof address === "string")
      data.address = address
    else warnOptional(PATH, WITHDRAW_NEW, "address", data.address);
  }
  if (chain) {
    if (typeof chain === "string")
      data.chain = chain
    else warnOptional(PATH, WITHDRAW_NEW, "chain", data.chain);
  }
  if (coin) {
    if (typeof coin === "string")
      data.coin = coin
    else warnOptional(PATH, WITHDRAW_NEW, "coin", data.coin);
  }

  return bybitPost(sign, WITHDRAW_NEW, data);
};

export default withdrawNew;

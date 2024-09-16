/**
 * Bybit API wallet withdraw endpoint.
 * 
 * @module request/bybit/wallet/withdraw
 */

import nodeCrypto from "node:crypto";
import config from "../../../configuration/bybit.json" with { type: "json" };
import { throwRequired, warnOptional } from "../../../lib/output.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };
import bybitPost from "../post.mjs";

const {
    PATH: {
      TRANSFER_INTERNAL
    },
  } = config,
  {
    account,
    authentication: {
      sign
    },
    currency: {
      base
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/create-inter-transfer
 */
const transferInternal = (toAccountType, amount, coin) => {
  const data = {
    coin: base,
    fromAccountType: account.wallet,
    transferId: nodeCrypto.randomUUID()
  };

  if (Number(amount))
    data.amount = Number(amount)
  else throwRequired(PATH, TRANSFER_INTERNAL, "amount");
  if (typeof toAccountType === "string")
    data.toAccountType = toAccountType
  else throwRequired(PATH, TRANSFER_INTERNAL, "toAccountType");
  if (coin) {
    if (typeof coin === "string")
      data.coin = coin
    else warnOptional(PATH, TRANSFER_INTERNAL, "coin", data.coin);
  }

  return bybitPost(sign, TRANSFER_INTERNAL, data);
};

export default transferInternal;

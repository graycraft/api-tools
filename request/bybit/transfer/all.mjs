/**
 * Bybit API wallet withdraw endpoint.
 * 
 * @module request/bybit/wallet/withdraw
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { throwRequired } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    PATH: {
      TRANSFER_ALL
    },
  } = config,
  {
    account,
    authentication: {
      sign
    },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 */
const transferAll = (toAccountType) => {
  const data = {
    fromAccountType: account.wallet,
  };

  if (typeof toAccountType === "string")
    data.toAccountType = toAccountType
  else throwRequired(PATH, TRANSFER_ALL, "toAccountType");

  return bybitGet(sign, TRANSFER_ALL, data);
};

export default transferAll;

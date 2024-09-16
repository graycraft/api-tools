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
      WITHDRAW_ONE
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 */
const withdrawOne = (txID) => {
  const data = {};

  if (typeof txID === "string")
    data.txID = txID
  else throwRequired(PATH, WITHDRAW_ONE, "txID");

  return bybitGet(sign, WITHDRAW_ONE, data);
};

export default withdrawOne;

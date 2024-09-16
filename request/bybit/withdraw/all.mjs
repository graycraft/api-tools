/**
 * Bybit API wallet withdraw endpoint.
 * 
 * @module request/bybit/wallet/withdraw
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import bybitGet from "../get.mjs";

const {
    PATH: {
      WITHDRAW_ALL
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
const withdrawAll = () => {
  const data = {};

  return bybitGet(sign, WITHDRAW_ALL, data);
};

export default withdrawAll;

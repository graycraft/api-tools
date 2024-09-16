/**
 * Handle Bybit API deposit new master endpoint.
 * 
 * @module request/bybit/new-master
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      DEPOSIT_NEW_MASTER
    },
  } = config,
  {
    authentication: {
      sign
    },
    currency: {
      base,
      network,
    },
  } = settings;

/**
 * Value of `chain` param from `CURRENCY_ALL` endpoint must be used for `chainType`.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/master-deposit-addr
 */
const depositNewMaster = (coin, chainType) => {
  const defaults = {
      chainType: network,
      coin: base,
    },
    data = validate(
      DEPOSIT_NEW_MASTER, isValid, defaults,
      { warnOptional: { chainType, coin } },
    );

  return bybitGet(sign, DEPOSIT_NEW_MASTER, data);
};

export default depositNewMaster;

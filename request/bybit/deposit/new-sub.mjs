/**
 * Handle Bybit API deposit new sub endpoint.
 * 
 * @module request/bybit/new-sub
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      DEPOSIT_NEW_SUB
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
 * Value of `chain` param must from `CURRENCY_ALL` endpoint must be used for `chainType`.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr
 */
const depositNewSub = (subMemberId, coin, chainType) => {
  const defaults = {
      chainType: network,
      coin: base,
    },
    data = validate(
      DEPOSIT_NEW_SUB, isValid, defaults,
      { throwRequired: { subMemberId } },
      { warnOptional: { chainType, coin } },
    );

  return bybitGet(sign, DEPOSIT_NEW_SUB, data);
};

export default depositNewSub;

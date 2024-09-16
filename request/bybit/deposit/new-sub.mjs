/**
 * Handle Bybit API deposit new sub endpoint.
 * 
 * @module request/bybit/new-sub
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * Value of `chain` param must from `CURRENCY_ALL` endpoint must be used for `chainType`.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr
 */
const depositNewSub = (subMemberId, coin, chainType) => {
  const { config, settings } = global.apiTools,
    { PATH: { DEPOSIT_NEW_SUB } } = config,
    {
      account,
      authentication: { sign },
      currency: {
        base,
        network
      }
    } = settings,
    defaults = {
      chainType: network,
      coin: base,
      subMemberId: account.SPOT
    },
    data = bybitValidate(DEPOSIT_NEW_SUB, defaults,
      { warnOptional: { chainType, coin, subMemberId } },
    );

  return bybitGet(sign, DEPOSIT_NEW_SUB, data);
};

export default depositNewSub;

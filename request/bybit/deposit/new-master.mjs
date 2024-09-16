/**
 * Handle Bybit API deposit new master endpoint.
 * 
 * @module request/bybit/new-master
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * Value of `chain` param from `CURRENCY_ALL` endpoint must be used for `chainType`.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/master-deposit-addr
 */
const depositNewMaster = (coin, chainType) => {
  const { config, settings } = global.apiTools,
    { PATH: { DEPOSIT_NEW_MASTER } } = config,
    {
      authentication: { sign },
      currency: {
        base,
        // network
      }
    } = settings,
    defaults = {
      // chainType: network,
      coin: base,
    },
    data = bybitValidate(DEPOSIT_NEW_MASTER, defaults,
      { warnOptional: { coin } },
      { warnRequired: { chainType } },
    );

  return bybitGet(sign, DEPOSIT_NEW_MASTER, data);
};

export default depositNewMaster;

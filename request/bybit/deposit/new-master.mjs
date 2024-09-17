/**
 * Handle Bybit API deposit new master endpoint.
 *
 * @module request/bybit/new-master
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositNewMaster as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * Value of `chain` param from `CURRENCY_ALL` endpoint must be used for `chainType`.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/master-deposit-addr
 * @returns {Promise<object>} JSON data from response.
 */
const depositNewMaster = (coin, chainType) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_NEW_MASTER },
    } = config,
    {
      authentication: { security },
      currency: { base, network },
    } = settings,
    defaults = {
      chainType: network,
      coin: base,
    },
    data = validate(DEPOSIT_NEW_MASTER, defaults, { warnOptional: { coin, chainType } }),
    json = get(DEPOSIT_NEW_MASTER, schema, security, data);

  return json;
};

export default depositNewMaster;

/**
 * Handle Bybit API endpoint, with new deposit address information of a master account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/master-deposit-addr
 * @module request/bybit/deposit/new-master
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositNewMaster as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * @param {string} coin Currency name.
 * @param {string} chainType Value of `chain` parameter from `CURRENCY_ALL` endpoint must be used for this.
 * @returns {Promise<Object>} JSON data from response.
 */
const depositNewMaster = async (coin, chainType) => {
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
    json = await get(DEPOSIT_NEW_MASTER, schema, security, data);

  return json;
};

export default depositNewMaster;

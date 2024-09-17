/**
 * Handle Bybit API transfer one endpoint by currency name.
 *
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @module request/bybit/transfer/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { transferOne as schema } from '../../../response/bybit/transfer/schema.mjs';

/**
 * @todo Implement parse filter by currency as API does not support it.
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @param {string} toAccountType
 * @param {string} coin
 * @returns {Promise<object>} JSON data from response.
 */
const transferOne = (toAccountType, coin) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSFER_ONE },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base },
    } = settings,
    defaults = {
      fromAccountType: account.wallet,
      coin: base,
    },
    data = validate(TRANSFER_ONE, defaults, {
      warnOptional: { coin },
      throwRequired: { toAccountType },
    }),
    json = get(TRANSFER_ONE, schema, security, data);

  return json;
};

export default transferOne;

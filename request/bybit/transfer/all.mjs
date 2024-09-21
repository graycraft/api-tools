/**
 * Handle Bybit API endpoint, with all transferable coin list between each account type.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @module request/bybit/transfer/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { transferAll as schema } from '../../../response/bybit/transfer/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} toAccountType To account type.
 * @param {{ fromAccountType? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const transferAll = async (toAccountType, { fromAccountType } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSFER_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRANSFER_ALL, {
      defaults: { fromAccountType: account.wallet },
      optional: { fromAccountType },
      required: { toAccountType },
    }),
    json = await get(TRANSFER_ALL, schema, security, data);

  return json;
};

export default transferAll;

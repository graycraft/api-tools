/**
 * Handle Bybit API transfer all endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @module request/bybit/transfer/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { transferAll as schema } from '../../../response/bybit/transfer/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @param {string} toAccountType
 * @returns {Promise<object>} JSON data from response.
 */
const transferAll = (toAccountType) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSFER_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = { fromAccountType: account.wallet },
    data = validate(TRANSFER_ALL, defaults, { throwRequired: { toAccountType } }),
    json = get(TRANSFER_ALL, schema, security, data);

  return json;
};

export default transferAll;

/**
 * Handle Bybit API endpoint, with all transferable coin list between each account type.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @typedef {import("#types/response/bybit/transfer/all.d.js").default} TransferAll
 * @module request/bybit/transfer/all
 */

import { transferAll as schema } from '#res/bybit/transfer/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} toAccountType To account type.
 * @param {{ fromAccountType? }} options
 * @returns {Promise<TransferAll>} JSON data from response.
 */
const transferAll = async (toAccountType, { fromAccountType } = {}) => {
  const { config, settings } = global.apiTools.bybit,
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

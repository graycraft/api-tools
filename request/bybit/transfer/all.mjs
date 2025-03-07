/**
 * Handle Bybit API request, with all transferable coin list between each account type.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @typedef {import("#types/response/bybit/transfer/all.d.js").default} TransferAll
 * @module request/bybit/transfer/all
 */

import { transferAll as schema } from '#res/bybit/transfer/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} fromAccountType From account type.
 * @param {string} toAccountType To account type.
 * @returns {Promise<TransferAll>} JSON data from response.
 */
const transferAll = async (fromAccountType, toAccountType) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { TRANSFER_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRANSFER_ALL, {
      defaults: { toAccountType: account.wallet },
      optional: { toAccountType },
      required: { fromAccountType },
    }),
    json = await get(TRANSFER_ALL, schema, security, data);

  return json;
};

export default transferAll;

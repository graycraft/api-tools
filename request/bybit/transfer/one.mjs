/**
 * Handle Bybit API endpoint, with one transferable coin between each account type.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @typedef {import("#types/response/bybit/transfer/one.d.js").default} TransferOne
 * @module request/bybit/transfer/one
 */

import { transferOne as schema } from '#res/bybit/transfer/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} toAccountType To account type.
 * @param {string} coin Not supported by the API, must be filtered while parsing.
 * @returns {Promise<TransferOne>} JSON data from response.
 */
const transferOne = async (toAccountType, coin) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { TRANSFER_ONE },
    } = config,
    {
      currency: { base },
    } = prefs,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRANSFER_ONE, {
      defaults: {
        coin: base,
        fromAccountType: account.wallet,
      },
      throw: { coin, toAccountType },
    }),
    json = await get(TRANSFER_ONE, schema, security, data);

  return json;
};

export default transferOne;

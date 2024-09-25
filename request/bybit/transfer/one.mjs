/**
 * Handle Bybit API endpoint, with one transferable coin between each account type.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/transferable-coin
 * @module request/bybit/transfer/one
 */

import { transferOne as schema } from '#res/bybit/transfer/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} toAccountType To account type.
 * @param {string} coin Not supported by the API, must be filtered while parsing.
 * @returns {Promise<object>} JSON data from response.
 */
const transferOne = async (toAccountType, coin) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSFER_ONE },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base },
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

/**
 * Handle Bybit API balance request, with asset and risk rate information of each currency (coin).
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/wallet-balance
 * @typedef {import("#types/response/bybit/balance/information.d.js").default} BalanceInformation
 * @module request/bybit/balance/information
 */

import { balanceInformation as schema } from '#res/bybit/balance/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} accountType Account type.
 * @param {string} coin Currency code, multiple values supported, separated by commas.
 * @returns {Promise<BalanceInformation>} JSON data from response.
 */
const balanceInformation = async (accountType, coin) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { BALANCE_INFORMATION },
    } = config,
    {
      account: { wallet },
      authentication: { security },
    } = settings,
    data = validate(BALANCE_INFORMATION, {
      defaults: {
        accountType: wallet,
      },
      optional: { accountType },
      required: { coin },
    }),
    json = await get(BALANCE_INFORMATION, schema, security, data);

  return json;
};

export default balanceInformation;

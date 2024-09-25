/**
 * Handle Bybit API balance endpoint, with asset and risk rate information of each currency.
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/wallet-balance
 * @module request/bybit/balance/information
 */

import { balanceInformation as schema } from '#res/bybit/balance/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} accountType Account type.
 * @param {string} coin Currency name, multiple values supported, separated by commas.
 * @returns {Promise<object>} JSON data from response.
 */
const balanceInformation = async (accountType, coin) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { BALANCE_INFORMATION },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(BALANCE_INFORMATION, {
      defaults: {
        accountType: account.wallet,
      },
      optional: { accountType },
      required: { coin },
    }),
    json = await get(BALANCE_INFORMATION, schema, security, data);

  return json;
};

export default balanceInformation;

/**
 * Handle Bybit API balance endpoint, with asset and risk rate information of each currency.
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/wallet-balance
 * @module request/bybit/balance/information
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { balanceInformation as schema } from '../../../response/bybit/balance/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} accountType Account type.
 * @param {string} coin Currency name, multiple values supported, separated by commas.
 * @returns {Promise<Object>} JSON data from response.
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
    defaults = {
      accountType: account.wallet,
    },
    data = validate(
      BALANCE_INFORMATION,
      defaults,
      { warnOptional: { accountType } },
      { warnRequired: { coin } },
    ),
    json = await get(BALANCE_INFORMATION, schema, security, data);

  return json;
};

export default balanceInformation;

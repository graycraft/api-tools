/**
 * Handle Bybit API balance endpoint, with asset and risk rate information of each currency.
 *
 * @module request/bybit/account/information
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { balanceInformation as schema } from '../../../response/bybit/balance/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/wallet-balance
 * @returns {Promise<object>} JSON data from response.
 */
const balanceInformation = (accountType, coin) => {
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
    json = get(BALANCE_INFORMATION, schema, security, data);

  return json;
};

export default balanceInformation;

/**
 * Handle Bybit API endpoint, with margin mode and upgraded status information of an account.
 *
 * @module request/bybit/account/information
 */

import get from '../get.mjs';
import { accountInformation as schema } from '../../../response/bybit/account/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/account-info
 * @returns {Promise<object>} JSON data from response.
 */
const accountInformation = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ACCOUNT_INFORMATION },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = get(ACCOUNT_INFORMATION, schema, security);

  return json;
};

export default accountInformation;

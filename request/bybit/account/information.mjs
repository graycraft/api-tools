/**
 * Handle Bybit API endpoint, with margin mode and upgraded status information of an account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/account-info
 * @module request/bybit/account/information
 */

import { accountInformation as schema } from '#res/bybit/account/schema.mjs';
import get from '../get.mjs';

/**
 * @returns {Promise<object>} JSON data from response.
 */
const accountInformation = async () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ACCOUNT_INFORMATION },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = await get(ACCOUNT_INFORMATION, schema, security);

  return json;
};

export default accountInformation;

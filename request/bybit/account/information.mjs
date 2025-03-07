/**
 * Handle Bybit API request, with margin mode and upgraded status information of an account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/account-info
 * @typedef {import("#types/response/bybit/account/information.d.js").default} AccountInformation
 * @module request/bybit/account/information
 */

import { accountInformation as schema } from '#res/bybit/account/schema.mjs';

import get from '../get.mjs';

/**
 * @returns {Promise<AccountInformation>} JSON data from response.
 */
const accountInformation = async () => {
  const { config, settings } = global.apiTools.bybit,
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

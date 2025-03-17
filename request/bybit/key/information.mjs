/**
 * Handle Bybit API key information request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/user/apikey-info
 * @typedef {import("#types/response/bybit/key/information.js").default} JKeyInformation
 * @module request/bybit/key/information
 */

import { keyInformation as schema } from '#res/bybit/key/schema.mjs';

import get from '../get.mjs';

/**
 * @returns {Promise<JKeyInformation>} JSON data from response.
 */
const keyInformation = async () => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { KEY_INFORMATION },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = await get(KEY_INFORMATION, schema, security);

  return json;
};

export default keyInformation;

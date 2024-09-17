/**
 * Handle Bybit API key information endpoint.
 *
 * @module request/bybit/key/information
 */

import get from '../get.mjs';
import { keyInformation as schema } from '../../../response/bybit/key/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/user/apikey-info
 * @returns {Promise<object>} JSON data from response.
 */
const keyInformation = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { KEY_INFORMATION },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = get(KEY_INFORMATION, schema, security);

  return json;
};

export default keyInformation;

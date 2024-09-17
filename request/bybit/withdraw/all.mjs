/**
 * Handle Bybit API all wallet withdraw endpoint.
 *
 * @module request/bybit/withdraw/all
 */

import get from '../get.mjs';
import { withdrawAll as schema } from '../../../response/bybit/withdraw/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @returns {Promise<object>} JSON data from response.
 */
const withdrawAll = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { WITHDRAW_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = get(WITHDRAW_ALL, schema, security);

  return json;
};

export default withdrawAll;

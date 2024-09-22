/**
 * Handle Coinbase Advanced API all account addresses endpoint.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-addresses
 * @module request/coinbase/address/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { addressAll as schema } from '../../../response/coinbase/address/schema.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} [limit] Pagination limit (default is 25). Not described in documentation.
 * @returns {Promise<{ data: [{ id: string }] }>}
 */
const addressAll = async (account_uuid, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ADDRESS },
    } = config,
    {
      account: { uuid },
      authentication: { security },
    } = settings,
    data = validate(ADDRESS, {
      defaults: {
        account_uuid: uuid,
      },
      optional: { account_uuid },
      required: { limit },
    }),
    json = await get(ADDRESS, schema, security, data);

  return json;
};

export default addressAll;

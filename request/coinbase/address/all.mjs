/**
 * Handle Coinbase Advanced API all account addresses endpoint, listing all created addresses.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-addresses
 * @typedef {import("#types/response/coinbase/address/all.d.js").default} AddressAll
 * @module request/coinbase/address/all
 */

import { addressAll as schema } from '#res/coinbase/address/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Latest generated address is the first item in the data array.
 * @param {string} limit Pagination limit (default: 25, maximum: 300). Not described in documentation.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<AddressAll>} JSON data from response.
 */
const addressAll = async (limit = '1', account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { ADDRESS },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(ADDRESS, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      required: { limit },
    }),
    json = await get(ADDRESS, schema, security, data);

  return json;
};

export default addressAll;

/**
 * Handle Coinbase Advanced API all account addresses request.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-addresses
 * @typedef {import("#types/response/coinbase/address/all.js").default} JAddressAll
 * @module request/coinbase/address/all
 */

import { addressAll as schema } from '#res/coinbase/address/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Latest generated address is the first item in the data array.
 * @param {string} limit Pagination limit (default: 25, maximum: 100…300). Not described in documentation.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<JAddressAll>} JSON data from response.
 */
const addressAll = async (limit = '100', account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { ADDRESS_ALL },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(ADDRESS_ALL, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      required: { limit },
    }),
    json = await get(ADDRESS_ALL, schema, security, data);

  return json;
};

export default addressAll;

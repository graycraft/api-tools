/**
 * Handle Coinbase Advanced API one account address request.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#show-address
 * @typedef {import("#types/response/coinbase/address/one.js").default} JAddressOne
 * @module request/coinbase/address/all
 */

import { addressOne as schema } from '#res/coinbase/address/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} address_uuid Address UUID. Also regular cryptocurrency address can be used here.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<JAddressOne>} JSON data from response.
 */
const addressOne = async (address_uuid, account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { ADDRESS_ONE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(ADDRESS_ONE, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      throw: { address_uuid },
    }),
    json = await get(ADDRESS_ONE, schema, security, data);

  return json;
};

export default addressOne;

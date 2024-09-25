/**
 * Handle Coinbase Advanced API new address endpoint, creating an address for an account.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#create-address
 * @module request/coinbase/address/new
 */

import { addressNew as schema } from '#res/coinbase/address/schema.mjs';
import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * Addresses can be created for wallet account types.
 * @param {string} name Address label.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<{
 *   data: {
 *     address: string,
 *     id: string,
 *     network: string
 *   }
 * }>} JSON data from response.
 */
const addressNew = async (name, account_uuid) => {
  const { config, settings } = global.apiTools,
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
      required: { name },
    }),
    json = await post(ADDRESS, schema, security, data);

  return json;
};

export default addressNew;

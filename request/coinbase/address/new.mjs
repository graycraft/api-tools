/**
 * Handle Coinbase Advanced API endpoint, with creating an address for an account.
 * Addresses can be created for wallet account types.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#create-address
 * @module request/coinbase/address/new
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { addressNew as schema } from '../../../response/coinbase/address/schema.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} [name] Address label.
 * @returns {Promise<{ data: { id: string } }>}
 */
const addressNew = async (account_uuid, name) => {
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
      optional: { account_uuid, name },
    }),
    json = await post(ADDRESS, schema, security, data);

  return json;
};

export default addressNew;

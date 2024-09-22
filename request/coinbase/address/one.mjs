/**
 * Handle Coinbase Advanced API endpoint, with one address for an account.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-addresses
 * @module request/coinbase/address/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { addressOne as schema } from '../../../response/coinbase/address/schema.mjs';

/**
 * @param {string} address_uuid Address UUID. Also regular cryptocurrency address can be used here.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<{ data: { id: string } }>}
 */
const addressOne = async (address_uuid, account_uuid) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ADDRESS_ONE },
    } = config,
    {
      account: { uuid },
      authentication: { security },
    } = settings,
    data = validate(ADDRESS_ONE, {
      defaults: {
        account_uuid: uuid,
      },
      optional: { account_uuid },
      required: { address_uuid },
    }),
    json = await get(ADDRESS_ONE, schema, security, data);

  return json;
};

export default addressOne;

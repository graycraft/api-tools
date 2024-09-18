/**
 * Handle Coinbase Advanced API endpoint for all addresses.
 *
 * @module request/coinbase/address/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { addressAll as schema } from '../../../response/coinbase/address/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-addresses
 */
const addressAll = (account_uuid) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ADDRESS_ALL },
    } = config,
    {
      authentication: { security },
      currency: { uuid },
    } = settings,
    defaults = {
      account_uuid: uuid,
    },
    data = validate(ADDRESS_ALL, defaults, {
      warnOptional: { account_uuid },
    }),
    json = get(ADDRESS_ALL, schema, security, data);

  return json;
};

export default addressAll;

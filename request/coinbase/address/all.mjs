/**
 * Handle Coinbase Advanced API address all endpoint.
 * 
 * @module request/coinbase/address/all
 */

import coinbaseGet from "../get.mjs";
import isValidParams from "../validate.mjs";
import validateParams from "../../validate.mjs";;

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-addresses
 */
const addressAll = (account_uuid) => {
  const { config, settings } = global.apiTools,
    { PATH: { ADDRESS_ALL } } = config,
    {
      authentication: { sign },
      currency: { uuid },
    } = settings,
    defaults = {
      account_uuid: uuid,
    },
    data = validateParams(
      ADDRESS_ALL, isValidParams, defaults,
      { warnOptional: { account_uuid } },
    );

  return coinbaseGet(sign, ADDRESS_ALL, data)
};

export default addressAll;

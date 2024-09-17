/**
 * Handle Coinbase Advanced API address one endpoint.
 *
 * @module request/coinbase/address/one
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#show-address
 */
const addressOne = (coin) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ADDRESS_ONE },
    } = config,
    {
      authentication: { sign },
      currency: { base },
    } = settings,
    defaults = {
      coin: base,
    },
    data = validateParams(ADDRESS_ONE, isValidParams, defaults, {
      warnOptional: { coin },
    });

  return coinbaseGet(sign, ADDRESS_ONE, data);
};

export default addressOne;

/**
 * Handle Bybit API deposit new master endpoint.
 *
 * @module request/coinbase/new-master
 */

import coinbasePost from '../post.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#create-address
 */
const depositNew = (account_uuid) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_NEW },
    } = config,
    {
      authentication: { sign },
      currency: { uuid },
    } = settings,
    defaults = {
      account_uuid: uuid,
    },
    data = validateParams(DEPOSIT_NEW, isValidParams, defaults, {
      warnOptional: { account_uuid },
    });

  return coinbasePost(sign, DEPOSIT_NEW, data);
};

export default depositNew;

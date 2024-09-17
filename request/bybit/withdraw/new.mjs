/**
 * Handle Bybit API new wallet withdraw endpoint.
 * API key pair must have "*Withdrawal" permission.
 *
 * @module request/bybit/withdraw/new
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { withdrawNew as schema } from '../../../response/bybit/withdraw/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw
 */
const withdrawNew = (amount, coin, address, chain) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { WITHDRAW_NEW },
    } = config,
    {
      address: { withdraw },
      authentication: { security },
      currency: { base, network },
    } = settings,
    defaults = {
      address: withdraw,
      chain: network,
      coin: base,
      timestamp: Date.now(),
    },
    data = validate(
      WITHDRAW_NEW,
      defaults,
      { throwRequired: { amount } },
      { warnOptional: { address, chain, coin } },
    ),
    json = post(WITHDRAW_NEW, schema, security, data);

  return json;
};

export default withdrawNew;

/**
 * Handle Coinbase Advanced API new account withdraw request.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#send-money
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/coinbase-app-travel-rule
 * @typedef {import("#types/coinbase.ts").default} Coinbase
 * @typedef {import("#types/response/coinbase/withdraw/new.d.js").default} WithdrawNew
 * @module request/coinbase/withdraw/new
 */

import { withdrawAll as schema } from '#res/coinbase/withdraw/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * API key pair must have withdrawal permission.
 * @param {string} amount Currency amount to withdraw.
 * @param {string} currency Currency code.
 * @param {string} to Currency address name.
 * @param {string} [network] Currency network name.
 * @param {{
 *   account_uuid?: string,
 *   travel_rule_data?: Coinbase["settings"]["user"]["DEFAULT"]["travel_rule_data"]
 * }} options Optional parameters.
 * @returns {Promise<WithdrawNew>} JSON data from response.
 */
const withdrawNew = async (
  amount,
  currency,
  to,
  network,
  { account_uuid, travel_rule_data } = {},
) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { WITHDRAW_NEW },
      PRODUCT: { BASE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio, withdraw },
    } = settings,
    type = 'send',
    data = validate(WITHDRAW_NEW, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
        currency: BASE.CODE,
        network: BASE.NETWORK,
        to: withdraw,
        travel_rule_data: /** @type {object} */ (user[portfolio].travel_rule_data),
        type,
      },
      optional: {
        account_uuid,
        currency,
        network,
        to,
        travel_rule_data: /** @type {object} */ (travel_rule_data),
      },
      required: {},
      throw: { amount },
    }),
    json = await post(WITHDRAW_NEW, schema, security, data);

  return json;
};

export default withdrawNew;

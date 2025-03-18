/**
 * Handle Coinbase Advanced API account's all fiat currencies deposit entries request.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-deposits#list-deposits
 * @typedef {import("#types/response/coinbase/deposit/fiat-all.js").default} JDepositFiatAll
 * @module request/coinbase/deposit/fiat-all
 */

import { depositFiatAll as schema } from '#res/coinbase/deposit/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @returns {Promise<JDepositFiatAll>} JSON data from response.
 */
const depositFiatAll = async (account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { DEPOSIT_FIAT_ALL },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(DEPOSIT_FIAT_ALL, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
    }),
    json = await get(DEPOSIT_FIAT_ALL, schema, security, data);

  return json;
};

export default depositFiatAll;

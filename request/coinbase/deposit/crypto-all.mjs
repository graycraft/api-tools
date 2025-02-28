/**
 * Handle Coinbase Advanced API all crypto deposit entries endpoint.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#list-transactions
 * @typedef {import("#types/response/coinbase/deposit/crypto-all.d.js").default} DepositCryptoAll
 * @module request/coinbase/deposit/crypto-all
 */

import { depositCryptoAll as schema } from '#res/coinbase/deposit/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} [limit] Pagination limit (default: 25, maximum: 300). Not described in documentation.
 * @returns {Promise<DepositCryptoAll>} JSON data from response.
 */
const depositCryptoAll = async (account_uuid, limit = '300') => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { DEPOSIT_CRYPTO_ALL },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(DEPOSIT_CRYPTO_ALL, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid, limit },
    }),
    json = await get(DEPOSIT_CRYPTO_ALL, schema, security, data);

  return json;
};

export default depositCryptoAll;

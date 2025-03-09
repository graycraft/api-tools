/**
 * Handle Coinbase Advanced API account's one crypto currency deposit entry request.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#show-transaction
 * @typedef {import("#types/response/coinbase/deposit/crypto-one.d.js").default} DepositCryptoOne
 * @module request/coinbase/deposit/crypto-one
 */

import { depositCryptoOne as schema } from '#res/coinbase/deposit/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} transaction_id Transaction identifier.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<DepositCryptoOne>} JSON data from response.
 */
const depositCryptoOne = async (transaction_id, account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { DEPOSIT_CRYPTO_ONE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(DEPOSIT_CRYPTO_ONE, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      throw: { transaction_id },
    }),
    json = await get(DEPOSIT_CRYPTO_ONE, schema, security, data);

  return json;
};

export default depositCryptoOne;

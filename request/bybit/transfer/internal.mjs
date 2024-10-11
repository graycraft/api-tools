/**
 * Handle Bybit API endpoint, with internal transfer between different account types under the same UID.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/create-inter-transfer
 * @typedef {import("#types/response/bybit/transfer/internal.d.js").default} TransferInternal
 * @module request/bybit/transfer/internal
 */

import nodeCrypto from 'node:crypto';
import { transferInternal as schema } from '#res/bybit/transfer/schema.mjs';
import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} toAccountType Account type to transfer.
 * @param {string} amount Currency amount to transfer.
 * @param {string} [coin] Currency name.
 * @param {{ fromAccountType?, transferId? }} options
 * @returns {Promise<TransferInternal>} JSON data from response.
 */
const transferInternal = async (
  toAccountType,
  amount,
  coin,
  { fromAccountType, transferId } = {},
) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { TRANSFER_INTERNAL },
    } = config,
    {
      currency: { base },
    } = prefs,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRANSFER_INTERNAL, {
      defaults: {
        coin: base,
        fromAccountType: account.wallet,
        transferId: nodeCrypto.randomUUID(),
      },
      optional: { coin, fromAccountType, transferId },
      throw: { amount, toAccountType },
    }),
    json = await post(TRANSFER_INTERNAL, schema, security, data);

  return json;
};

export default transferInternal;

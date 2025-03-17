/**
 * Handle Bybit API request, with internal transfer between different account types under the same UID.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/create-inter-transfer
 * @typedef {import("#types/response/bybit/transfer/internal.js").default} JTransferInternal
 * @module request/bybit/transfer/internal
 */

import nodeCrypto from 'node:crypto';

import { transferInternal as schema } from '#res/bybit/transfer/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} fromAccountType From account type.
 * @param {string} toAccountType Account type to transfer.
 * @param {string} amount Currency amount to transfer.
 * @param {string} [coin] Currency code.
 * @param {{
 *   transferId?: string;
 * }} options
 * @returns {Promise<JTransferInternal>} JSON data from response.
 */
const transferInternal = async (
  fromAccountType,
  toAccountType,
  amount,
  coin,
  { transferId } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE },
      PATH: { TRANSFER_INTERNAL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRANSFER_INTERNAL, {
      defaults: {
        coin: BASE.NAME,
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

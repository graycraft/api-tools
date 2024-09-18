/**
 * Handle Bybit API endpoint, with internal transfer between different account types under the same UID.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/create-inter-transfer
 * @module request/bybit/transfer/internal
 */

import nodeCrypto from 'node:crypto';
import post from '../post.mjs';
import validate from '../validate.mjs';
import { transferInternal as schema } from '../../../response/bybit/transfer/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} toAccountType To account type.
 * @param {string} amount Currency amount to transfer.
 * @param {string} [coin] Currency name.
 * @param {{ fromAccountType?, transferId? }} rest
 * @returns {Promise<Object>} JSON data from response.
 */
const transferInternal = async (
  toAccountType,
  amount,
  coin,
  { fromAccountType, transferId } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSFER_INTERNAL },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base },
    } = settings,
    defaults = {
      coin: base,
      fromAccountType: account.wallet,
      transferId: nodeCrypto.randomUUID(),
    },
    data = validate(
      TRANSFER_INTERNAL,
      defaults,
      { throwRequired: { amount, toAccountType } },
      { warnOptional: { coin, fromAccountType, transferId } },
    ),
    json = await post(TRANSFER_INTERNAL, schema, security, data);

  return json;
};

export default transferInternal;

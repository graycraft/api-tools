/**
 * Handle Bybit API transfer internal endpoint.
 *
 * @module request/bybit/transfer/internal
 */

import nodeCrypto from 'node:crypto';
import post from '../post.mjs';
import validate from '../validate.mjs';
import { transferInternal as schema } from '../../../response/bybit/transfer/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/transfer/create-inter-transfer
 * @param {string} toAccountType
 * @param {string} amount
 * @param {string} coin
 * @returns {Promise<object>} JSON data from response.
 */
const transferInternal = (toAccountType, amount, coin) => {
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
      { warnOptional: { coin } },
    ),
    json = post(TRANSFER_INTERNAL, schema, security, data);

  return json;
};

export default transferInternal;

/**
 * Handle Bybit API new wallet withdraw endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw
 * @module request/bybit/withdraw/new
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { withdrawNew as schema } from '../../../response/bybit/withdraw/schema.mjs';

/**
 * API key pair must have "*Withdrawal" permission.
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/vasp-list
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @see https://www.bybit.com/user/assets/money-address
 * @param {string} amount Currency amount to withdraw.
 * @param {string} coin Currency name.
 * @param {string} [address] Currency address name, case sensitive (
 *   for `forceChain` 0 or 1 fill wallet address, and make sure to add address in the address book first;
     for `forceChain` 2 fill Bybit UID, it can only be another Bybit main account UID. Add UID in the address book first
   ).
 * @param {string} [chain] Currency chain name (
 *   for `forceChain` 0 or 1 this field is required;
 *   for `forceChain` 2 this field can be omitted
 * ).
 * @param {{
 *   accountType?, beneficiary?, beneficiaryName?, feeType?, forceChain?,
 *   requestId?, tag?, timestamp?, vaspEntityId?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const withdrawNew = async (
  amount,
  coin,
  address,
  chain,
  {
    accountType,
    beneficiary,
    beneficiaryName,
    feeType,
    forceChain,
    requestId,
    tag,
    timestamp,
    vaspEntityId,
  } = {},
) => {
  const { config, settings, timestamp: now } = global.apiTools,
    {
      PATH: { WITHDRAW_NEW },
    } = config,
    {
      address: { withdraw },
      authentication: { security },
      currency: { base, network },
    } = settings,
    data = await validate(WITHDRAW_NEW, {
      defaults: {
        address: withdraw,
        chain: network,
        coin: base,
        timestamp: now,
      },
      optional: { address, chain, coin, timestamp },
      required: {
        accountType,
        beneficiary,
        beneficiaryName,
        feeType,
        forceChain,
        requestId,
        tag,
        vaspEntityId,
      },
      throw: { amount },
    }),
    json = post(WITHDRAW_NEW, schema, security, data);

  return json;
};

export default withdrawNew;

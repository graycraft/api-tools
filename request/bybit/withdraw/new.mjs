/**
 * Handle Bybit API new wallet withdraw request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/vasp-list
 * @see https://www.bybit.com/user/assets/money-address
 * @typedef {import("#types/response/bybit/withdraw/new.js").default} JWithdrawNew
 * @module request/bybit/withdraw/new
 */

import { withdrawNew as schema } from '#res/bybit/withdraw/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * API key pair must have "*Withdrawal" permission.
 * @param {string} amount Currency amount to withdraw.
 * @param {string} coin Currency code.
 * @param {string} [address] Currency address name, case sensitive (
 *   for `forceChain` 0 or 1 fill wallet address, and make sure to add address in the address book first;
     for `forceChain` 2 fill Bybit UID, it can only be another Bybit main account UID. Add UID in the address book first
   ).
 * @param {string} [chain] Currency chain name (
 *   for `forceChain` 0 or 1 this field is required;
 *   for `forceChain` 2 this field can be omitted
 * ).
 * @param {{
 *   accountType?: string;
 *   beneficiary?: string;
 *   beneficiaryName?: string;
 *   feeType?: string;
 *   forceChain?: string;
 *   requestId?: string;
 *   tag?: string;
 *   timestamp?: string;
 *   vaspEntityId?: string;
 * }} options Optional parameters.
 * @returns {Promise<JWithdrawNew>} JSON data from response.
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
  const { timestamp: now } = global.apiTools,
    { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE },
      PATH: { WITHDRAW_NEW },
    } = config,
    {
      account: { withdraw },
      authentication: { security },
    } = settings,
    data = validate(WITHDRAW_NEW, {
      defaults: {
        address: withdraw,
        chain: BASE.CHAIN,
        coin: BASE.NAME,
        timestamp: String(now),
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
    json = await post(WITHDRAW_NEW, schema, security, data);

  return json;
};

export default withdrawNew;

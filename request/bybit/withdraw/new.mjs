/**
 * Handle Bybit API new wallet withdraw request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/vasp-list
 * @see https://www.bybit.com/user/assets/money-address
 * @typedef {import("#types/response/bybit/withdraw/new.d.js").default} WithdrawNew
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
 *   accountType?, beneficiary?, beneficiaryName?, feeType?, forceChain?, requestId?, tag?, timestamp?, vaspEntityId?
 * }} options Optional parameters.
 * @returns {Promise<WithdrawNew>} JSON data from response.
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
      ASSET: { BASE },
      PATH: { WITHDRAW_NEW },
    } = config,
    {
      address: { withdraw },
      authentication: { security },
    } = settings,
    data = validate(WITHDRAW_NEW, {
      defaults: {
        address: withdraw,
        chain: BASE.NETWORK,
        coin: BASE.CODE,
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

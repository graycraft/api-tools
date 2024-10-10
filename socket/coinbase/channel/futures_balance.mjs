/**
 * Handle subscription to Coinbase Advanced web socket `futures_balance_summary` channel.
 * Real-time updates every time a user's futures balance changes.
 * The `futures_balance_summary` channel sends updates on all of a user's futures balances,
 * including all subsequent updates of those balances.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#futures-balance-summary-channel
 * @module socket/coinbase/channel/futures_balance
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

const futuresBalance = (product_ids) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      SOCKET: {
        CHANNEL: { FUTURES_BALANCE },
      },
    } = config,
    {
      asset: { base, quote },
      authentication: { security },
    } = settings,
    defaults = {
      product_ids: [base.code + '-' + quote.code],
    },
    data = coinbaseValidate(FUTURES_BALANCE, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(security, FUTURES_BALANCE, data);
};

export default futuresBalance;

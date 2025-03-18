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

/**
 * @param {string} product_ids One or more currency pair codes (e.g. "ETH-USDC").
 * @returns {Promise<WebSocket>}
 */
const futuresBalance = (product_ids) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PRODUCT: { BASE, QUOTE },
      SOCKET: {
        CHANNEL: { FUTURES_BALANCE },
      },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {
      product_ids: [BASE.CODE + '-' + QUOTE.CODE],
    },
    data = coinbaseValidate(FUTURES_BALANCE, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(security, FUTURES_BALANCE, data);
};

export default futuresBalance;

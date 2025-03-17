/**
 * Handle subscription to Coinbase Advanced web socket `market_trades` channel.
 * Real-time updates every time a market trade happens.
 * The `market_trades` channel sends market trades for a specified product on a preset interval.
 * A market trades message is of the type `snapshot` or `update`, and contains an array of market trades.
 * Each market trade belongs to a side, which refers to the makers side, and can be of type BUY, or SELL.
 * The channel collects all updates over the last 250 ms and sends them as an update -
 * so an update can contain one or many trades, depending on the last 250 ms of trading volume.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#market-trades-channel
 * @module socket/coinbase/channel/market_trades
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @param {string} product_ids One or more currency pair codes (e.g. "ETH-USDC").
 * @returns {Promise<WebSocket>}
 */
const marketTrades = (product_ids) => {
  const { config } = global.apiTools.coinbase,
    {
      PRODUCT: { BASE, QUOTE },
      SOCKET: {
        CHANNEL: { MARKET_TRADES },
      },
    } = config,
    defaults = {
      product_ids: [BASE.CODE + '-' + QUOTE.CODE],
    },
    data = coinbaseValidate(MARKET_TRADES, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, MARKET_TRADES, data);
};

export default marketTrades;

/**
 * Handle subscription to Coinbase Advanced web socket `ticker` channel.
 * Real-time price updates every time a match happens.
 * Use this channel to guarantee that messages are delivered and order book is in sync.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#ticker-channel
 * @module socket/coinbase/channel/ticker
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @param {string} product_ids One or more currency pair codes (e.g. "ETH-USDC").
 * @returns {Promise<WebSocket>}
 */
const ticker = (product_ids) => {
  const { config } = global.apiTools.coinbase,
    {
      PRODUCT: { BASE, QUOTE },
      SOCKET: {
        CHANNEL: { TICKER },
      },
    } = config,
    defaults = {
      product_ids: [BASE.CODE + '-' + QUOTE.CODE],
    },
    data = coinbaseValidate(TICKER, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, TICKER, data);
};

export default ticker;

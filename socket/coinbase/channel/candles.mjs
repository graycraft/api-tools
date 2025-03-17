/**
 * Handle subscription to Coinbase Advanced web socket `candles` channel.
 * Real-time updates on product candles.
 * Candles are grouped into buckets (granularities) of five minutes.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#candles-channel
 * @typedef {import("#types/common.ts").dictLike} dictLike
 * @module socket/coinbase/channel/candles
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @param {string} product_ids One or more currency pair codes (e.g. "ETH-USDC").
 * @returns {Promise<WebSocket>}
 */
const candles = (product_ids) => {
  const { config } = global.apiTools.coinbase,
    {
      PRODUCT: { BASE, QUOTE },
      SOCKET: {
        CHANNEL: { CANDLES },
      },
    } = config,
    defaults = {
      product_ids: [BASE.CODE + '-' + QUOTE.CODE],
    },
    data = coinbaseValidate(CANDLES, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, CANDLES, data);
};

export default candles;

/**
 * Handle subscription to Coinbase Advanced web socket `level2` channel.
 * All updates and easiest way to keep order book snapshot.
 * Use this channel to guarantee that messages are delivered and order book is in sync.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels#level2-channel
 * @module socket/coinbase/channel/level2
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @param {string} product_ids One or more currency pair codes (e.g. "ETH-USDC").
 * @returns {Promise<WebSocket>}
 */
const level2 = (product_ids) => {
  const { config } = global.apiTools.coinbase,
    {
      PRODUCT: { BASE, QUOTE },
      SOCKET: {
        CHANNEL: { LEVEL2 },
      },
    } = config,
    defaults = {
      product_ids: [BASE.CODE + '-' + QUOTE.CODE],
    },
    data = coinbaseValidate(LEVEL2, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, LEVEL2, data);
};

export default level2;

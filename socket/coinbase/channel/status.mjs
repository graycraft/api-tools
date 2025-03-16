/**
 * Handle subscription to Coinbase Advanced web socket `status` channel.
 * Sends all products and currencies on a preset interval.
 * Clients are automatically subscribed to all products if `product_ids` is not provided.
 * The status channel, like most channels, closes within 60-90 seconds when there are no updates.
 * If you listen for BTC-USDC updates and nothing changes within 60-90 seconds (which is common), the channel closes.
 * To avoid this, subscribe to the heartbeats in addition to your other channels.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#status-channel
 * @module socket/coinbase/channel/status
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @param {string} product_ids One or more currency pair codes (e.g. "ETH-USDC").
 * @returns {Promise<WebSocket>}
 */
const status = (product_ids) => {
  const { config } = global.apiTools.coinbase,
    {
      PRODUCT: { BASE, QUOTE },
      SOCKET: {
        CHANNEL: { STATUS },
      },
    } = config,
    defaults = {
      product_ids: [BASE.CODE + '-' + QUOTE.CODE],
    },
    data = coinbaseValidate(STATUS, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, STATUS, data);
};

export default status;

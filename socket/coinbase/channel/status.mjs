/**
 * Handle subscription to Coinbase Advanced web socket `status` channel.
 * Sends all products and currencies on a preset interval.
 * Clients are automatically subscribed to all products if `product_ids` is not provided.
 * The status channel, like most channels, closes within 60-90 seconds when there are no updates.
 * If you listen for BTC-USD updates and nothing changes within 60-90 seconds (which is common), the channel closes.
 * To avoid this, subscribe to the heartbeats in addition to your other channels.
 *
 * @module socket/coinbase/channel/status
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#status-channel
 */
const status = (product_ids) => {
  const { config, settings } = global.apiTools,
    {
      SOCKET: {
        CHANNEL: { STATUS },
      },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base + '-' + quote],
    },
    data = coinbaseValidate(STATUS, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, STATUS, data);
};

export default status;

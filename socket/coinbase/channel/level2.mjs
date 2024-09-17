/**
 * Handle subscription to Coinbase Advanced web socket `level2` channel.
 * All updates and easiest way to keep order book snapshot.
 * Use this channel to guarantee that messages are delivered and order book is in sync.
 *
 * @module socket/coinbase/channel/level2
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels#level2-channel
 */
const level2 = (product_ids) => {
  const { config, settings } = global.apiTools,
    {
      SOCKET: {
        CHANNEL: { LEVEL2 },
      },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base + '-' + quote],
    },
    data = coinbaseValidate(LEVEL2, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, LEVEL2, data);
};

export default level2;

/**
 * Handle subscription to Coinbase Advanced WebSocket level2 channel.
 * Use this channel to guarantee that messages are delivered and order book is in sync.
 *
 * @module socket/coinbase/level2
 */

import coinbaseSubscribe from './subscribe.mjs';

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
      authentication: { sign },
      currency: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base + '-' + quote],
    },
    data = { ...defaults };

  if (product_ids) {
    data.product_ids = product_ids.split(',');
  } else console.log('`product_ids` is not defined.');

  return coinbaseSubscribe(sign, LEVEL2, data);
};

export default level2;

/**
 * Handle subscription to Coinbase Advanced web socket `ticker` channel.
 * Real-time price updates every time a match happens.
 * Use this channel to guarantee that messages are delivered and order book is in sync.
 *
 * @module socket/coinbase/channel/ticker
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#ticker-channel
 */
const ticker = (product_ids) => {
  const { config, settings } = global.apiTools,
    {
      SOCKET: {
        CHANNEL: { TICKERS },
      },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base + '-' + quote],
    },
    data = coinbaseValidate(TICKERS, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, TICKERS, data);
};

export default ticker;

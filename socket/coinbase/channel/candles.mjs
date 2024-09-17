/**
 * Handle subscription to Coinbase Advanced web socket `candles` channel.
 * Real-time updates on product candles.
 * Candles are grouped into buckets (granularities) of five minutes.
 *
 * @module socket/coinbase/channel/candles
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#candles-channel
 */
const candles = (product_ids) => {
  const { config, settings } = global.apiTools,
    {
      SOCKET: {
        CHANNEL: { CANDLES },
      },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base + '-' + quote],
    },
    data = coinbaseValidate(CANDLES, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, CANDLES, data);
};

export default candles;

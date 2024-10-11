/**
 * Handle subscription to Coinbase Advanced web socket `ticker_batch` channel.
 * Real-time price updates every 5 seconds if there is a change.
 * It has the same JSON-schema message as the `ticker` channel,
 * except the `channel` field will have a value of `ticker_batch`.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#ticker-batch-channel
 * @module socket/coinbase/channel/ticker_batch
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

const tickerBatch = (product_ids) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      SOCKET: {
        CHANNEL: { TICKER_BATCH },
      },
    } = config,
    {
      asset: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base.code + '-' + quote.code],
    },
    data = coinbaseValidate(TICKER_BATCH, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, TICKER_BATCH, data);
};

export default tickerBatch;

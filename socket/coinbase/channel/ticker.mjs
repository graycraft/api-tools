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

const ticker = (product_ids) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      SOCKET: {
        CHANNEL: { TICKER },
      },
    } = config,
    {
      asset: { base, quote },
    } = settings,
    defaults = {
      product_ids: [base.code + '-' + quote.code],
    },
    data = coinbaseValidate(TICKER, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(null, TICKER, data);
};

export default ticker;

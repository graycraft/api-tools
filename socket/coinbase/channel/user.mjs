/**
 * Handle subscription to Coinbase Advanced web socket `user` channel.
 * Only sends messages that include the authenticated user.
 * The user channel sends updates on all of a user's open orders and current positions,
 * including all subsequent updates of those orders and positions.
 * The user channel expects one connection per user.
 * If none product identifiers provided, the subscription is open to all.
 * To subscribe to new `product_ids`, close previous connection by unsubscribing and
 * open a new connection with `product_ids` added to the array.
 * Subscribing to the User channel returns all `OPEN` orders, batched by 50, in the first few messages of the stream.
 * To know when all of your open orders are returned, look for the first message with less than 50 orders.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#user-channel
 * @module socket/coinbase/channel/user
 */

import coinbaseSubscribe from '../subscribe.mjs';
import coinbaseValidate from '../validate.mjs';

const user = (product_ids) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      SOCKET: {
        CHANNEL: { USER },
      },
    } = config,
    {
      asset: { base, quote },
      authentication: { security },
    } = settings,
    defaults = {
      product_ids: [base.code + '-' + quote.code],
    },
    data = coinbaseValidate(USER, defaults, { warnOptional: { product_ids } });

  return coinbaseSubscribe(security, USER, data);
};

export default user;

/**
 * Handle Coinbase Advanced API order cancel all endpoint.
 *
 * @module request/coinbase/order/cancel-all
 */

import coinbasePost from '../post.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://coinbase-exchange.github.io/docs/v5/order/cancel-order
 */
const orderCancelAll = (order_ids) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_CANCEL_ALL },
    } = config,
    {
      account: { category },
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      order_ids: ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'],
    },
    data = validateParams(
      ORDER_CANCEL_ALL,
      isValidParams,
      defaults,
      {} /* { throwRequired: { order_ids } } */,
    );

  return coinbasePost(sign, ORDER_CANCEL_ALL, data);
};

export default orderCancelAll;

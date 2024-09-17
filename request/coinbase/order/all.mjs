/**
 * Handle Coinbase Advanced API order all endpoint.
 *
 * @module request/coinbase/order/all
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders
 */
const orderAll = (product_id, product_type, limit, { order_side } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_ALL },
    } = config,
    {
      authentication: { sign },
    } = settings,
    defaults = {
      /** @todo Constants. */
      order_status: 'OPEN',
      product_type: 'SPOT',
    },
    data = validateParams(
      ORDER_ALL,
      isValidParams,
      defaults,
      { warnOptional: { order_side, product_id, product_type } },
      { warnRequired: { limit } },
    );

  return coinbaseGet(sign, ORDER_ALL, data);
};

export default orderAll;

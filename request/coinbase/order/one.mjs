/**
 * Handle Coinbase Advanced API order one endpoint.
 * 
 * @module request/coinbase/order/one
 */

import coinbaseGet from "../get.mjs";
import isValidParams from "../validate.mjs";
import validateParams from "../../validate.mjs";

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorder
 */
const orderOne = (order_id, {
  client_order_id,
  user_native_currency
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_ONE } } = config,
    { authentication: { sign } } = settings,
    defaults = {},
    data = validateParams(
      ORDER_ONE, isValidParams, defaults,
      { throwRequired: { order_id } },
    );

  return coinbaseGet(sign, ORDER_ONE, data)
};

export default orderOne;

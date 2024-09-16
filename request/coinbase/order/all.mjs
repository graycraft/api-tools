/**
 * Handle Coinbase Advanced API order all endpoint.
 * 
 * @module request/coinbase/order/all
 */

import coinbaseGet from "../get.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/coinbase/validate.mjs";
import settings from "../../../settings/coinbase.json" with { type: "json" };

const {
    PATH: {
      ORDER_ALL
    },
    TRADE,
  } = config,
  {
    account: {
      category,
    },
    authentication: {
      sign
    },
    currency: {
      base,
      quote
    }
  } = settings;

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders/
 */
const orderAll = (product_id, order_side, limit, {
  asset_filters,
  contract_expiry_type,
  cursor,
  end_date,
  order_ids,
  order_placement_source,
  order_status,
  order_types,
  product_ids,
  product_type,
  retail_portfolio_id,
  sort_by,
  start_date,
  time_in_forces,
  user_native_currency,
} = {}) => {
  const defaults = {
      order_status: "OPEN",
      product_id: base + "-" + quote,
    },
    data = validate(
      ORDER_ALL, isValid, defaults,
      { warnOptional: { order_side, order_status, product_id } },
      { warnRequired: { limit } },
    );

  return coinbaseGet(sign, ORDER_ALL, data);
};

export default orderAll;

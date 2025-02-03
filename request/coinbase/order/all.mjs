/**
 * Handle Coinbase Advanced API all orders endpoint.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders
 * @typedef {import("#types/response/coinbase/order/all.d.js").default} OrderAll
 * @module request/coinbase/order/all
 */

import { orderAll as schema } from '#res/coinbase/order/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * If `has_next` in response data is `true`, more pages are available to fetch.
 * The parameters `start_date` and `end_date` don't apply to open orders.
 * `assetFilters` parameter not applicable for open orders
 * @param {string} limit Pagination limit (default: no, maximum: 1000).
 * @param {{
 *   asset_filters?, contract_expiry_type?, cursor?, end_date?, order_ids?,
 *   order_placement_source?, order_side?, order_status?, order_types?, product_ids?,
 *   product_type?, retail_portfolio_id?, sort_by?, start_date?, time_in_forces?
 * }} options Optional parameters.
 * @returns {Promise<OrderAll>} JSON data from response.
 */
const orderAll = async (
  limit,
  {
    asset_filters,
    contract_expiry_type,
    cursor,
    end_date,
    order_ids,
    order_placement_source,
    order_side,
    order_status,
    order_types,
    /* product_id, */
    product_ids,
    product_type,
    retail_portfolio_id,
    sort_by,
    start_date,
    time_in_forces,
  } = {},
) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      ORDER,
      PATH: { ORDER_ALL },
      PRODUCT,
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(ORDER_ALL, {
      defaults: {
        order_status: ORDER.STATUS[5],
        product_type: PRODUCT.SPOT,
      },
      optional: { order_status, product_type },
      required: {
        asset_filters,
        contract_expiry_type,
        cursor,
        end_date,
        limit,
        order_ids,
        order_placement_source,
        order_side,
        order_types,
        /* product_id, */
        product_ids,
        product_type,
        retail_portfolio_id,
        sort_by,
        start_date,
        time_in_forces,
      },
    }),
    json = await get(ORDER_ALL, schema, security, data);

  return json;
};

export default orderAll;

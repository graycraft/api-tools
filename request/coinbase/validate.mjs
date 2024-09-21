/**
 * Validate parameters for a Coinbase Advanced API request.
 *
 * @module request/coinbase/validate
 */

import { hasSome, requestValidate } from '../validate.mjs';
import { REGEXP } from '../../lib/constants.mjs';
import { fileNameNewest, fileReadJson } from '../../lib/file_system.mjs';

/**
 * @param {string} path
 * @param {object} options
 * @returns
 */
const coinbaseValidate = (path, options) => requestValidate(path, isValid, options);

/**
 * @param {{ [key: string]: value }} param
 * @returns {boolean}
 */
const isValid = (param) => {
  const { UUID } = REGEXP,
    { config } = global.apiTools,
    {
      ORDER,
      USER: { PORTFOLIO },
    } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/coinbase/currency_all',
    currencyFile = fileNameNewest(currencyDir),
    currencyAll = fileReadJson(currencyDir, currencyFile.name);
  /* networkDir = 'collection/coinbase/network_all',
    networkFile = fileNameNewest(networkDir),
    networkAll = fileReadJson(networkDir, networkFile.name) */

  /**
   * @todo `contract_expiry_type`.
   * @todo `expiring_contract_status`.
   * @todo `get_all_products`.
   * @todo `offset`.
   * @todo `product_id`.
   * @todo `product_ids`.
   * @todo `product_type`.
   * `name` as address label, random string.
   */
  switch (key) {
    case 'account_uuid':
    case 'address_uuid':
    case 'next_starting_after':
    case 'portfolio_uuid':
    case 'previous_ending_before':
    case 'retail_portfolio_id':
      return UUID.test(value);
    case 'limit':
      return Boolean(Number(value));
    case 'order_ids':
      return value instanceof Array;
    case 'order_configuration':
      const order = value[ORDER.LIMIT] ?? value[ORDER.MARKET];

      if (value[ORDER.MARKET]) {
        return typeof order.base_size === 'string' || typeof order.quote_size === 'string';
      }

      return typeof order.base_size === 'string' && typeof order.limit_price === 'string';
    case 'portfolio_type':
      return PORTFOLIO.some((portfolio) => portfolio === value);
    default:
      return typeof value === 'string';
  }
};

export default coinbaseValidate;

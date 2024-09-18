/**
 * Validate parameters for a Coinbase Advanced API request.
 *
 * @module request/coinbase/validate
 */

import requestValidate from '../validate.mjs';
import { REGEXP } from '../../lib/constants.mjs';
import { fileNameNewest, fileReadJson } from '../../lib/file_system.mjs';

const isValid = (param) => {
  const { UUID } = REGEXP,
    { config } = global.apiTools,
    {
      CURRENCY,
      TRADE,
      USER: { PORTFOLIO },
    } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/coinbase/currency_all',
    currencyFile = fileNameNewest(currencyDir),
    currencyAll = fileReadJson(currencyDir, currencyFile.name);
  /* networkDir = 'collection/coinbase/network_all',
    networkFile = fileNameNewest(networkDir),
    networkAll = fileReadJson(networkDir, networkFile.name) */

  switch (key) {
    case 'account_uuid':
      return UUID.test(value);
    /* case 'chainType':
      return networkAll.some((currency) => currency === value); */
    case 'cursor':
      return UUID.test(value);
    case 'limit':
      return Number(value);
    case 'portfolio_type':
      return PORTFOLIO.some((portfolio) => portfolio === value);
    case 'portfolio_uuid':
      return UUID.test(value);
    case 'retail_portfolio_id':
      return UUID.test(value);
    default:
      return typeof value === 'string';
  }
};

const coinbaseValidate = (path, defaults, ...options) => {
  const data = requestValidate(path, isValid, defaults, ...options);

  return data;
};

export default coinbaseValidate;

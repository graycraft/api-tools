/**
 * Validate parameters for a Bybit API request.
 *
 * @module request/bybit/validate
 */

import requestValidate from '../validate.mjs';
import { REGEXP } from '../../lib/constants.mjs';
import { fileNameNewest, fileReadJson } from '../../lib/file_system.mjs';

const isValid = (param) => {
  const { TRANSACTION_IDENTIFIER } = REGEXP,
    { config } = global.apiTools,
    { ACCOUNT, CURRENCY, TRADE } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/bybit/currency_all',
    currencyFile = fileNameNewest(currencyDir),
    currencyAll = fileReadJson(currencyDir, currencyFile.name),
    networkDir = 'collection/bybit/network_all',
    networkFile = fileNameNewest(networkDir),
    networkAll = fileReadJson(networkDir, networkFile.name);

  switch (key) {
    case 'accountType':
      return ACCOUNT.WALLET.some((account) => account === value);
    case 'chainType':
      return networkAll.some((currency) => currency === value);
    case 'coin':
      return currencyAll.some((currency) => currency === value);
    case 'limit':
    case 'memberId':
    case 'withBonus':
      return Number(value);
    case 'memberIds':
      return Number(value) || value.split(',').every((member) => Number(member));
    case 'side':
      return Object.values(TRADE).some((side) => side === value);
    /**
     * @todo Iterate over full list from collection.
     */
    case 'symbol':
      return Object.values(CURRENCY.BASE).some((currency1) =>
        Object.values(CURRENCY.QUOTE).some(
          (currency2) => currency1 + currency2 === value && currency1 !== currency2,
        ),
      );
    case 'txID':
      return TRANSACTION_IDENTIFIER.test(value);
    default:
      return typeof value === 'string';
  }
};

const bybitValidate = (path, defaults, ...options) => {
  const data = requestValidate(path, isValid, defaults, ...options);

  return data;
};

export default bybitValidate;

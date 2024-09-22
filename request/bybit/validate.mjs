/**
 * Validate parameters for a Bybit API request.
 *
 * @module request/bybit/validate
 */

import { hasSome, requestValidate } from '../validate.mjs';
import { withinRange } from '../../lib/boolean.mjs';
import { NUMBER, REGEXP } from '../../lib/constants.mjs';
import { fileNameNewest, fileReadJson } from '../../lib/file_system.mjs';

/**
 * @param {string} path
 * @param {{
 *   defaults?: { [key: string]: string },
 *   optional?: { [key: string]: string },
 *   required?: { [key: string]: string },
 *   throw?: { [key: string]: string },
 * }} options
 * @returns
 */
const bybitValidate = (path, options) => requestValidate(path, isValid, options);

/**
 * @param {{ [key: string]: value }} param
 * @returns {boolean}
 */
const isValid = (param) => {
  const { EVM_TXID, INTEGER, UUID } = REGEXP,
    { config } = global.apiTools,
    { ACCOUNT, OPTION, ORDER, TRADE } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/bybit/currency_all',
    currencyFile = fileNameNewest(currencyDir),
    currencyAll = fileReadJson(currencyDir, currencyFile.name),
    networkDir = 'collection/bybit/currency_network_all',
    networkFile = fileNameNewest(networkDir),
    networkAll = fileReadJson(networkDir, networkFile.name);

  /**
   * `cursor` string format is different for each endpoint.
   * `orderLinkId` is order identifier in a user defined format.
   */
  switch (key) {
    case 'accountType':
    case 'fromAccountType':
    case 'toAccountType':
      return hasSome(ACCOUNT.WALLET, value);
    case 'amount':
      return INTEGER.test(value);
    case 'baseCoin':
    case 'coin':
      return hasSome(currencyAll, value);
    case 'category':
      return hasSome(ACCOUNT.CATEGORY, value);
    case 'chain':
      return hasSome(networkAll, value, 'chain');
    case 'chainType':
      return hasSome(networkAll, value, 'chainType');
    case 'settleCoin':
    case 'endTime':
      return withinDays(1, value, 31);
    case 'execType':
      return hasSome(TRADE.EXEC, value);
    case 'feeType':
      return hasSome(['0', '1'], value);
    case 'forceChain':
    case 'openOnly':
      return hasSome(['0', '1', '2'], value);
    case 'limit':
      return withinRange(1, value, 1_000);
    case 'memberId':
    case 'subMemberId':
      return withinUint32(value);
    case 'memberIds':
      return withinUint32(value) || value.split(',').every((member) => withinUint32(member));
    case 'optionType':
      return hasSome(OPTION, value);
    case 'orderFilter':
      return hasSome(ORDER.STOP, value);
    case 'orderStatus':
      return hasSome(ORDER.STATUS, value);
    case 'orderId':
      return INTEGER.test(value);
    case 'price':
    case 'qty':
      return Boolean(Number(value));
    case 'side':
      return hasSome(Object.values(TRADE.SIDE), value);
    case 'startTime':
      return withinDays(1, value, 31);
    case 'status':
      return TRADE.STATUS.some((item) => item === value);
    case 'stopOrderType':
      return ORDER.STOP.some((item) => item === value);
    case 'settleCoin':
    case 'symbol':
      return currencyAll.some((item1) =>
        currencyAll.some((item2) => item1 + item2 === value && item1 !== item2),
      );
    case 'transferId':
      return UUID.test(value);
    case 'txID':
      return EVM_TXID.test(value);
    case 'withBonus':
      return value === '0' || value === '1';
    case 'withdrawId':
      return withinUint32(value);
    case 'withdrawType':
      return ['0', '1', '2'].some((item) => item === value);
    default:
      return typeof value === 'string';
  }
};

const withinDays = (min, value, max) => {
  const {
      DATE: { DAY },
    } = NUMBER,
    { timestamp } = global.apiTools,
    after = timestamp + DAY * min,
    before = timestamp - DAY * max,
    isWithin = withinRange(before, value, after);

  return isWithin;
};

const withinUint32 = (value) => {
  const { UINT32_MAX_SAFE, UINT32_MIN_SAFE } = NUMBER,
    isWithin = withinRange(UINT32_MIN_SAFE, value, UINT32_MAX_SAFE);

  return isWithin;
};

export default bybitValidate;

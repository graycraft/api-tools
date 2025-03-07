/**
 * Validate parameters for a Bybit API request.
 *
 * @typedef {import("#types/common.ts").Dict} Dict
 * @module request/bybit/validate
 */

import { withinRange } from '#lib/boolean.mjs';
import { NUMBER, REGEXP } from '#lib/constants.mjs';
import { fileNewest, fileReadJson } from '#lib/file_system.mjs';

import { hasSome, requestValidate } from '../validate.mjs';

/**
 * @param {string} path
 * @param {{
 *   defaults?: Dict,
 *   optional?: Dict,
 *   required?: Dict,
 *   throw?: Dict,
 * }} options
 * @returns {{}}
 */
const bybitValidate = (path, options) =>
  requestValidate(global.apiTools.bybit.config, path, isValid, options);

/**
 * Validate a request data parameter before send.
 * @param {Dict} param Request parameter to validate.
 * @returns {boolean} Whether parameter is valid or not.
 */
const isValid = (param) => {
  const { EVM_TXID, FLOAT64, INTEGER, UUID } = REGEXP,
    { config } = global.apiTools.bybit,
    { ACCOUNT, OPTION, ORDER, TRADE } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/bybit/currency_all',
    currencyFile = fileNewest(currencyDir),
    currencyAll = fileReadJson(currencyDir, currencyFile.name).map((item) => item.coin),
    networkDir = 'collection/bybit/currency_network_all',
    networkFile = fileNewest(networkDir),
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
      return FLOAT64.test(value) || INTEGER.test(value);
    case 'baseCoin':
    case 'coin':
      if (value.includes(',')) {
        return value.split(',').every((coin) => hasSome(currencyAll, coin));
      }

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
      return hasSome(Object.values(ORDER.SIDE), value);
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

/**
 * @param {number} min
 * @param {string} value
 * @param {number} max
 * @returns {boolean}
 */
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

/**
 * @param {string} value
 * @returns {boolean}
 */
const withinUint32 = (value) => {
  const { UINT32_MAX_SAFE, UINT32_MIN_SAFE } = NUMBER,
    isWithin = withinRange(UINT32_MIN_SAFE, value, UINT32_MAX_SAFE);

  return isWithin;
};

export default bybitValidate;

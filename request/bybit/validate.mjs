/**
 * Validate parameters for a Bybit API request.
 *
 * @module request/bybit/validate
 */

import requestValidate from '../validate.mjs';
import { withinRange } from '../../lib/boolean.mjs';
import { NUMBER, REGEXP } from '../../lib/constants.mjs';
import { fileNameNewest, fileReadJson } from '../../lib/file_system.mjs';

const bybitValidate = (path, defaults, ...options) => {
  const data = requestValidate(path, isValid, defaults, ...options);

  return data;
};
/** @todo */
const hasSome = (path, defaults, ...options) => {
  const data = requestValidate(path, isValid, defaults, ...options);

  return data;
};

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
      return ACCOUNT.WALLET.some((item) => item === value);
    case 'amount':
      return INTEGER.test(value);
    case 'baseCoin':
      return currencyAll.some((item) => item === value);
    case 'category':
      return ACCOUNT.CATEGORY.some((item) => item === value);
    case 'chain':
      return networkAll.some((item) => item.chain === value);
    case 'chainType':
      return networkAll.some((item) => item.chainType === value);
    case 'settleCoin':
    case 'coin':
      return currencyAll.some((item) => item === value);
    case 'endTime':
      return withinDays(1, value, 31);
    case 'execType':
      return TRADE.EXEC.some((item) => item === value);
    case 'feeType':
      return ['0', '1'].some((item) => item === value);
    case 'forceChain':
      return ['0', '1', '2'].some((item) => item === value);
    case 'limit':
      return withinRange(1, value, 1_000);
    case 'memberId':
    case 'subMemberId':
      return withinUint32(value);
    case 'memberIds':
      return withinUint32(value) || value.split(',').every((member) => withinUint32(member));
    case 'openOnly':
      return ['0', '1', '2'].some((item) => item === value);
    case 'optionType':
      return OPTION.some((item) => item === value);
    case 'orderFilter':
      return ORDER.STOP.some((item) => item === value);
    case 'orderStatus':
      return ORDER.STATUS.some((item) => item === value);
    case 'orderId':
      return INTEGER.test(value);
    case 'price':
      return Number(value);
    case 'qty':
      return Number(value);
    case 'side':
      return Object.values(TRADE.SIDE).some((side) => side === value);
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

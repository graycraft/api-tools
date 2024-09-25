/**
 * Request Coinbase Advanced API spot endpoints.
 *
 * @typedef {import('#types/request/coinbase/address/transactions.d').T} AddressTransactions
 * @module request/coinbase
 */

import config from '#config/coinbase.json' with { type: 'json' };
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import status from '#res/coinbase/status.json' with { type: 'json' };
import settings from '#settings/coinbase.json' with { type: 'json' };

import addressAll from './coinbase/address/all.mjs';
import addressOne from './coinbase/address/one.mjs';
import addressNew from './coinbase/address/new.mjs';
import addressTransactions from './coinbase/address/transactions.mjs';
import currencyAll from './coinbase/currency/all.mjs';
import currencyOne from './coinbase/currency/one.mjs';
import marketAll from './coinbase/market/all.mjs';
import marketOne from './coinbase/market/one.mjs';
import marketTickers from './coinbase/market/tickers.mjs';
import orderAll from './coinbase/order/all.mjs';
import orderBook from './coinbase/order/book.mjs';
import orderCancel from './coinbase/order/cancel.mjs';
import orderLimitBuy from './coinbase/order/limit-buy.mjs';
import orderLimitSell from './coinbase/order/limit-sell.mjs';
import orderMarketBuy from './coinbase/order/market-buy.mjs';
import orderMarketSell from './coinbase/order/market-sell.mjs';
import orderOne from './coinbase/order/one.mjs';
import transactionAll from './coinbase/transaction/all.mjs';
import transactionOne from './coinbase/transaction/one.mjs';
import userAccountAll from './coinbase/user/account-all.mjs';
import userAccountOne from './coinbase/user/account-one.mjs';
import userPortfolioAll from './coinbase/user/portfolio-all.mjs';
import userPortfolioOne from './coinbase/user/portfolio-one.mjs';

const {
    user,
    user: { portfolio },
  } = settings,
  account = user[portfolio].account,
  timestamp = Date.now();

const requestCoinbase = () => {
  const { flow, handler, options, params } = parseArguments();

  global.apiTools.options = options;
  if (handler) {
    switch (handler) {
      case 'addressAll':
        return addressAll(...params);
      case 'addressNew':
        return addressNew(...params);
      case 'address':
      case 'addressOne':
        return addressOne(...params);
      case 'addressTransactions':
      case 'addressTxs':
        return addressTransactions(...params);
      case 'currencyAll':
        return currencyAll(...params);
      case 'currency':
      case 'currencyOne':
        return currencyOne(...params);
      case 'marketAll':
        return marketAll(...params);
      case 'market':
      case 'marketOne':
        return marketOne(...params);
      case 'marketTickers':
        return marketTickers(...params);
      case 'orderAll':
        return orderAll(...params);
      case 'orderBook':
        return orderBook(...params);
      case 'orderCancel':
        return orderCancel(...params);
      case 'orderLimit':
      case 'orderLimitBuy':
        return orderLimitBuy(...params);
      case 'orderLimitSell':
        return orderLimitSell(...params);
      case 'orderMarket':
      case 'orderMarketBuy':
        return orderMarketBuy(...params);
      case 'orderMarketSell':
        return orderMarketSell(...params);
      case 'order':
      case 'orderOne':
        return orderOne(...params);
      case 'transactionAll':
        return transactionAll(...params);
      case 'userAccountAll':
        return userAccountAll(...params);
      case 'userAccount':
      case 'userAccountOne':
        return userAccountOne(...params);
      case 'userPortfolioAll':
        return userPortfolioAll(...params);
      case 'userPortfolio':
      case 'userPortfolioOne':
        return userPortfolioOne(...params);
      default:
        throw new Error(requestCoinbase.name + ': ' + optional(handler));
    }
  } else {
    switch (flow) {
      case 'address':
        addressFlow(account);
        break;
      case 'currency':
        currencyFlow();
        break;
      case 'market':
        marketFlow();
        break;
      case 'order':
        orderFlow();
        break;
      case 'transaction':
        transactionFlow(account);
        break;
      case 'user':
        userFlow();
        break;
      default:
        Promise.resolve()
          .then(() => addressFlow(account))
          .then(() => currencyFlow())
          .then(() => marketFlow())
          .then(() => orderFlow())
          .then(() => transactionFlow(account))
          .then(() => userFlow())
          .catch(console.log.bind(console));
    }
  }
};

/**
 * @param {{ uuid: string }} account
 * @returns {Promise<AddressTransactions>}
 */
const addressFlow = (account) =>
  Promise.resolve()
    .then((response) => addressNew('abc', account.uuid))
    .then((response) => addressOne(response.data.id, account.uuid))
    .then((response) => addressAll('2', account.uuid))
    .then((response) => addressTransactions(response.data[0].id, '2', account.uuid))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ data: [{ asset_id: string; }] }>}
 */
const currencyFlow = () =>
  Promise.resolve()
    .then((response) => currencyAll())
    .then((response) => currencyOne(response.data[0].asset_id))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ data: { trades: [{ trade_id: string }] } }>}
 */
const marketFlow = () =>
  Promise.resolve()
    .then((response) => marketAll('2'))
    .then((response) => marketOne(response.products[0].product_id))
    .then((response) => marketTickers('BTC-USDT', '2'))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ results: { order_id: string, success: boolean } }>}
 */
const orderFlow = () =>
  Promise.resolve()
    .then((response) => orderBook('SHIB-USDT', '2'))
    .then((response) => orderMarketBuy('1'))
    .then((response) => orderMarketSell('0.0001'))
    .then((response) => orderLimitBuy('0.0001', '1000'))
    .then((response) => orderLimitSell('0.0001', '4000'))
    .then((response) => orderAll('2'))
    .then((response) => orderOne(response.orders[0].order_id))
    .then((response) => orderCancel(response.order.order_id))
    .catch(console.log.bind(console));

/**
 * @param {{ uuid: string }} account
 * @returns {Promise<{ data: [{ id: string; }] }>}
 */
const transactionFlow = (account) =>
  Promise.resolve()
    .then((response) => transactionAll(account.uuid, '2'))
    .then((response) => transactionOne(account.uuid, response.data[0].id))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ breakdown: object; }>}
 */
const userFlow = () =>
  Promise.resolve()
    .then((response) => userAccountAll('2'))
    .then((response) => userAccountOne(response.accounts[0].uuid))
    .then((response) => userPortfolioAll('DEFAULT'))
    .then((response) => userPortfolioOne(response.portfolios[0].uuid))
    .catch(console.log.bind(console));

global.apiTools = { config, output: {}, settings, status, timestamp };
requestCoinbase();

export default null;

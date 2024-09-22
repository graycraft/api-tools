/**
 * Request Coinbase Advanced API spot endpoints.
 *
 * @module request/coinbase
 */

import config from '../configuration/coinbase.json' with { type: 'json' };
import { optional } from '../lib/template.mjs';
import { parseArguments } from '../lib/utility.mjs';
import settings from '../settings/coinbase.json' with { type: 'json' };
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
import status from '../response/coinbase/status.json' with { type: 'json' };

const requestCoinbase = () => {
  const { flow, handler, options, params } = parseArguments(),
    { account } = settings,
    timestamp = Date.now();

  global.apiTools = { config, options, output: {}, settings, status, timestamp };
  if (handler) {
    switch (handler) {
      case 'addressAll':
        return addressAll(...params);
      case 'addressNew':
        return addressNew(...params);
      case 'addressOne':
        return addressOne(...params);
      case 'addressTransactions':
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
        address(account);
        break;
      case 'currency':
        currency();
        break;
      case 'market':
        market();
        break;
      case 'order':
        order();
        break;
      case 'transaction':
        transaction(account);
        break;
      case 'user':
        user();
        break;
      default:
        Promise.resolve()
          .then(() => address(account))
          .then(() => currency())
          .then(() => market())
          .then(() => order())
          .then(() => transaction(account))
          .then(() => user())
          .catch(console.log.bind(console));
    }
  }
};

/**
 * @param {{ uuid: string }} account
 * @returns {Promise<{ data: { id: string; } }>}
 */
const address = (account) =>
  Promise.resolve()
    .then((response) => addressNew(account.uuid))
    .then((response) => addressOne(response.data.id, account.uuid))
    .then((response) => addressAll(account.uuid, '2'))
    .then((response) => addressTransactions(response.data[0].id, account.uuid, '2'))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ data: { asset_id: string; } }>}
 */
const currency = () =>
  Promise.resolve()
    .then((response) => currencyAll())
    .then((response) => currencyOne(response.data[0].asset_id))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ data: { trades: [{ trade_id: string }] } }>}
 */
const market = () =>
  Promise.resolve()
    .then((response) => marketAll('BTC-EUR', '2'))
    .then((response) => marketOne(response.products[0].product_id))
    .then((response) => marketTickers('BTC-EUR', '2'))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ results: { order_id: string, success: boolean } }>}
 */
const order = () =>
  Promise.resolve()
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
const transaction = (account) =>
  Promise.resolve()
    .then((response) => transactionAll(account.uuid, '2'))
    .then((response) => transactionOne(account.uuid, response.data[0].id))
    .catch(console.log.bind(console));

/**
 * @returns {Promise<{ breakdown: object; }>}
 */
const user = () =>
  Promise.resolve()
    .then((response) => userAccountAll('2'))
    .then((response) => userAccountOne(response.accounts[0].uuid))
    .then((response) => userPortfolioAll('DEFAULT'))
    .then((response) => userPortfolioOne(response.portfolios[0].uuid))
    .catch(console.log.bind(console));

requestCoinbase();

export default null;

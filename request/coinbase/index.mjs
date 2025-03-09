/**
 * Request Coinbase Advanced API spot endpoints.
 *
 * @typedef {import("#types/coinbase.ts").userPortfolio} userPortfolio
 * @typedef {import("#types/response/coinbase.js").default} Response
 * @module request/coinbase/index
 */

import { argv } from 'node:process';

import config from '#config/coinbase.json' with { type: 'json' };
import { dirObject } from '#lib/output.mjs';
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import prefs from '#prefs/coinbase.json' with { type: 'json' };
import status from '#res/coinbase/status.json' with { type: 'json' };
import settings from '#settings/coinbase.json' with { type: 'json' };

import addressAll from './address/all.mjs';
import addressOne from './address/one.mjs';
import addressNew from './address/new.mjs';
import addressTransactions from './address/transactions.mjs';
import currencyAll from './currency/all.mjs';
import currencyOne from './currency/one.mjs';
import depositCryptoAll from './deposit/crypto-all.mjs';
import depositCryptoOne from './deposit/crypto-one.mjs';
import depositFiatAll from './deposit/fiat-all.mjs';
import marketAll from './market/all.mjs';
import marketOne from './market/one.mjs';
import marketTickers from './market/tickers.mjs';
import orderAll from './order/all.mjs';
import orderBook from './order/book.mjs';
import orderCancel from './order/cancel.mjs';
import orderLimitBuy from './order/limit-buy.mjs';
import orderLimitSell from './order/limit-sell.mjs';
import orderMarketBuy from './order/market-buy.mjs';
import orderMarketSell from './order/market-sell.mjs';
import orderOne from './order/one.mjs';
import productCandles from './product/candles.mjs';
import transactionAll from './transaction/all.mjs';
import transactionOne from './transaction/one.mjs';
import userAccountAll from './user/account-all.mjs';
import userAccountOne from './user/account-one.mjs';
import userPortfolioAll from './user/portfolio-all.mjs';
import userPortfolioOne from './user/portfolio-one.mjs';
import { pair } from './validate.mjs';
import withdrawAll from './withdraw/all.mjs';
import withdrawNew from './withdraw/new.mjs';
//import withdrawOne from './withdraw/one.mjs';

const {
    PRODUCT: { BASE, QUOTE },
  } = config,
  { debug } = prefs,
  {
    user,
    user: { portfolio },
  } = settings,
  account = user[portfolio].account,
  timestamp = Date.now();

const requestCoinbase = async () => {
  /**
   * Global types for each API are defined in `#types/global.d.ts`
   * @type {any}
   */
  const coinbase = {
      config,
      name: 'coinbase',
      prefs,
      settings,
      status,
    },
    { handler, options, params } = parseArguments(argv);

  global.apiTools = { coinbase, options, output: {}, timestamp };

  if (debug || options.debug) dirObject('global.apiTools', global.apiTools);
  if (handler) {
    switch (handler) {
      case 'addressAll':
        return await addressAll.apply(null, params);
      case 'addressNew':
        return await addressNew.apply(null, params);
      case 'address':
      case 'addressOne':
        return await addressOne.apply(null, params);
      case 'addressTransactions':
      case 'addressTxs':
        return await addressTransactions.apply(null, params);
      case 'currencyAll':
        return await currencyAll.apply(null, params);
      case 'currency':
      case 'currencyOne':
        return await currencyOne.apply(null, params);
      case 'depositCryptoAll':
        return await depositCryptoAll.apply(null, params);
      case 'depositCryptoOne':
        return await depositCryptoOne.apply(null, params);
      case 'depositFiatAll':
        return await depositFiatAll.apply(null, params);
      case 'marketAll':
        return await marketAll.apply(null, params);
      case 'market':
      case 'marketOne':
        return await marketOne.apply(null, params);
      case 'marketTickers':
        return await marketTickers.apply(null, params);
      case 'orderAll':
        return await orderAll.apply(null, params);
      case 'orderBook':
        return await orderBook.apply(null, params);
      case 'orderCancel':
        return await orderCancel.apply(null, params);
      case 'limit':
      case 'limitBuy':
      case 'orderLimit':
      case 'orderLimitBuy':
        return await orderLimitBuy.apply(null, params);
      case 'limitSell':
      case 'orderLimitSell':
        return await orderLimitSell.apply(null, params);
      case 'orderMarket':
      case 'orderMarketBuy':
        return await orderMarketBuy.apply(null, params);
      case 'orderMarketSell':
        return await orderMarketSell.apply(null, params);
      case 'order':
      case 'orderOne':
        return await orderOne.apply(null, params);
      case 'productCandles':
        return await productCandles.apply(null, params);
      case 'transactionAll':
        return await transactionAll.apply(null, params);
      case 'userAccountAll':
        return await userAccountAll.apply(null, params);
      case 'userAccount':
      case 'userAccountOne':
        return await userAccountOne.apply(null, params);
      case 'userPortfolioAll':
        return await userPortfolioAll.apply(null, params);
      case 'userPortfolio':
      case 'userPortfolioOne':
        return await userPortfolioOne.apply(null, params);
      case 'withdrawAll':
        return await withdrawAll.apply(null, params);
      /*case 'withdraw':
      case 'withdrawOne':
        return await withdrawOne.apply(null, params);*/
      case 'withdrawNew':
        return await withdrawNew.apply(null, params);
      default:
        throw new Error(requestCoinbase.name + ': ' + optional(handler));
    }
  } else {
    switch (options.flow) {
      case 'address':
        return await addressFlow(account);
      case 'currency':
        return await currencyFlow();
      case 'deposit':
        return await depositFlow(account);
      case 'market':
        return await marketFlow();
      case 'order':
        return await orderFlow();
      case 'transaction':
        return await transactionFlow(account);
      case 'user':
        return await userFlow();
      case 'withdraw':
        return await withdrawFlow(account);
      default:
        return await Promise.resolve()
          .then(() => addressFlow(account))
          .then(() => currencyFlow())
          .then(() => marketFlow())
          .then(() => orderFlow())
          .then(() => transactionFlow(account))
          .then(() => userFlow())
          .catch(console.error.bind(console));
    }
  }
};

/**
 * @param {{ uuid: string }} account
 * @returns {Promise<Response>}
 */
const addressFlow = (account) =>
  Promise.resolve()
    .then((response) => addressNew('abc', account.uuid))
    .then((response) => addressOne(response.data.id, account.uuid))
    .then((response) => addressAll('2', account.uuid))
    .then((response) => addressTransactions(response.data[0].id, '2', account.uuid))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<Response>}
 */
const currencyFlow = () =>
  Promise.resolve()
    .then((response) => currencyAll())
    .then((response) => currencyOne(response.data[0].asset_id))
    .catch(console.error.bind(console));
/**
 * @returns {Promise<Response>}
 */
const depositFlow = (account) =>
  Promise.resolve()
    .then((response) => depositCryptoAll(account.uuid))
    .then((response) => depositCryptoOne(response.data[0].id))
    .then((response) => depositFiatAll(account.uuid))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<Response>}
 */
const marketFlow = () =>
  Promise.resolve()
    .then((response) => marketAll('2'))
    .then((response) => marketOne(response.products[0].product_id))
    .then((response) => marketTickers(pair(BASE.CODE, QUOTE.CODE), '2'))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<Response>}
 */
const orderFlow = () =>
  Promise.resolve()
    .then((response) => orderBook(pair(BASE.CODE, QUOTE.CODE), '2'))
    .then((response) => orderMarketBuy('1'))
    .then((response) => orderMarketSell('0.0001'))
    .then((response) => orderLimitBuy('0.0001', '1000'))
    .then((response) => orderLimitSell('0.0001', '4000'))
    .then((response) => orderAll('2'))
    .then((response) => orderOne(response.orders[0].order_id))
    .then((response) => orderCancel(response.order.order_id))
    .catch(console.error.bind(console));

/**
 * @param {{ uuid: string }} account
 * @returns {Promise<Response>}
 */
const transactionFlow = (account) =>
  Promise.resolve()
    .then((response) => transactionAll(account.uuid, '2'))
    .then((response) => transactionOne(account.uuid, response.data[0].id))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<Response>}
 */
const userFlow = () =>
  Promise.resolve()
    .then((response) => userAccountAll('2'))
    .then((response) => userAccountOne(response.accounts[0].uuid))
    .then((response) => userPortfolioAll(/** @type {userPortfolio} */ (portfolio)))
    .then((response) => userPortfolioOne(response.portfolios[0].uuid))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<Response>}
 */
const withdrawFlow = (account) =>
  Promise.resolve()
    .then((response) => withdrawAll(account.uuid))
    //.then((response) => withdrawOne(response.data[0].id))
    //.then((response) => withdrawNew())
    .catch(console.error.bind(console));

export default requestCoinbase;

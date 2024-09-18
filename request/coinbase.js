/**
 * Request Coinbase Advanced API spot endpoints.
 *
 * @module request/coinbase
 */

import config from '../configuration/coinbase.json' with { type: 'json' };
import { NUMBER } from '../lib/constants.mjs';
import { optional } from '../lib/template.mjs';
import { parseArguments } from '../lib/utility.mjs';
import settings from '../settings/coinbase.json' with { type: 'json' };
import addressAll from './coinbase/address/all.mjs';
import currencyAll from './coinbase/currency/all.mjs';
import depositNew from './coinbase/deposit/new.mjs';
import marketInfo from './coinbase/market/info.mjs';
import marketHistory from './coinbase/market/history.mjs';
import marketTickers from './coinbase/market/tickers.mjs';
import orderAll from './coinbase/order/all.mjs';
import orderCancelAll from './coinbase/order/cancel-all.mjs';
import orderLimitBuy from './coinbase/order/limit-buy.mjs';
import orderLimitSell from './coinbase/order/limit-sell.mjs';
import orderMarketBuy from './coinbase/order/market-buy.mjs';
import orderOne from './coinbase/order/one.mjs';
import userAccountAll from './coinbase/user/account-all.mjs';
import userAccountOne from './coinbase/user/account-one.mjs';
import userPortfolioAll from './coinbase/user/portfolio-all.mjs';
import userPortfolioOne from './coinbase/user/portfolio-one.mjs';

const { ACCOUNT, TRADE } = config,
  {
    currency: { base, network },
  } = settings,
  requestCoinbase = () => {
    const { handler, options, params } = parseArguments(),
      {
        DATE: { DAY },
      } = NUMBER,
      timestamp = Date.now();

    global.apiTools = { config, options, output: {}, settings, timestamp };
    if (handler) {
      switch (handler) {
        case 'addressAll':
          return addressAll(...params);
        case 'currencyAll':
          return currencyAll(...params);
        case 'depositNew':
          return depositNew(...params);
        case 'marketHistory':
          return marketHistory(...params);
        case 'market':
        case 'marketInfo':
        case 'marketInformation':
          return marketInfo(...params);
        case 'marketTickers':
          return marketTickers(...params);
        case 'orderAll':
          return orderAll(...params);
        case 'orderCancelAll':
          return orderCancelAll(...params);
        case 'orderLimit':
        case 'orderLimitBuy':
          return orderLimitBuy(...params);
        case 'orderLimitSell':
          return orderLimitSell(...params);
        case 'orderMarket':
        case 'orderMarketBuy':
          return orderMarketBuy(...params);
        //case "orderMarketSell": return orderMarketSell(...params);
        case 'order':
        case 'orderOne':
          return orderOne(...params);
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
      Promise.resolve()
        .then((response) => orderAll())
        .catch(console.log.bind(console));
    }
  };

requestCoinbase();

export default null;

/**
 * Request Coinbase Advanced API spot endpoints.
 * 
 * @module request/coinbase
 */

import config from "../configuration/coinbase.json" with { type: "json" };
import { optional } from "../lib/template.mjs";
import { parseArguments } from "../lib/utility.mjs";
import settings from "../settings/coinbase.json" with { type: "json" };
import accountAll from "./coinbase/account/all.mjs";
import accountBalance from "./coinbase/account/balance.mjs";
import accountWallets from "./coinbase/account/wallets.mjs";
import addressAll from "./coinbase/address/all.mjs";
import currencyAll from "./coinbase/currency/all.mjs";
import depositNew from "./coinbase/deposit/new.mjs";
import marketInfo from "./coinbase/market/info.mjs";
import marketHistory from "./coinbase/market/history.mjs";
import marketTickers from "./coinbase/market/tickers.mjs";
import orderAll from "./coinbase/order/all.mjs";
import orderCancelAll from "./coinbase/order/cancel-all.mjs";
import orderLimitBuy from "./coinbase/order/limit-buy.mjs";
import orderLimitSell from "./coinbase/order/limit-sell.mjs";
import orderMarketBuy from "./coinbase/order/market-buy.mjs";
import orderOne from "./coinbase/order/one.mjs";

const {
    ACCOUNT,
    TRADE,
  } = config,
  {
    currency: {
      base,
      network,
    }
  } = settings,
  requestCoinbase = () => {
    const { handler, params } = parseArguments();

    global.apiTools = { config, settings };
    if (handler) {
      switch (handler) {
        case "accountAll": return accountAll(...params);
        case "accountBalance": return accountBalance(...params);
        case "accountWallets": return accountWallets(...params);
        case "addressAll": return addressAll(...params);
        case "currencyAll": return currencyAll(...params);
        case "depositNew": return depositNew(...params);
        case "marketHistory": return marketHistory(...params);
        case "market":
        case "marketInfo":
        case "marketInformation": return marketInfo(...params);
        case "marketTickers": return marketTickers(...params);
        case "orderAll": return orderAll(...params);
        case "orderCancelAll": return orderCancelAll(...params);
        case "orderLimit":
        case "orderLimitBuy": return orderLimitBuy(...params);
        case "orderLimitSell": return orderLimitSell(...params);
        case "orderMarket":
        case "orderMarketBuy": return orderMarketBuy(...params);
        //case "orderMarketSell": return orderMarketSell(...params);
        case "order":
        case "orderOne": return orderOne(...params);
        default: throw new Error(requestCoinbase.name + ": " + optional(handler))
      }
    } else {
      Promise.resolve()
        .then(response => orderAll())
        .catch(console.log.bind(console))
    }
  };

requestCoinbase();

export default null;

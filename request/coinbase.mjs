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
import currencyAll from "./coinbase/currency/all.mjs";
import depositNew from "./coinbase/deposit/new.mjs";
import orderAll from "./coinbase/order/all.mjs";
import marketTickers from "./coinbase/market/tickers.mjs";

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
        case "currencyAll": return currencyAll(...params);
        case "depositNew": return depositNew(...params);
        case "marketTickers": return marketTickers(...params);
        case "orderAll": return orderAll(...params);
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

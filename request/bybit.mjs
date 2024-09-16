/**
 * Request Bybit API spot endpoints.
 * 
 * @module request/bybit
 */

import config from "../configuration/bybit.json" with { type: "json" };
import { optional } from "../lib/template.mjs";
import { parseArguments } from "../lib/utility.mjs";
import settings from "../settings/bybit.json" with { type: "json" };
import accountBalanceRate from "./bybit/account/balance_rate.mjs";
import accountBalanceWallet from "./bybit/account/balance_wallet.mjs";
import accountInformation from "./bybit/account/information.mjs";
import accountWallets from "./bybit/account/wallets.mjs";
import currencyAll from "./bybit/currency/all.mjs";
import currencyOne from "./bybit/currency/one.mjs";
import depositAll from "./bybit/deposit/all.mjs";
import depositNewMaster from "./bybit/deposit/new-master.mjs";
import depositNewSub from "./bybit/deposit/new-sub.mjs";
import depositOne from "./bybit/deposit/one.mjs";
import keyInformation from "./bybit/key/information.mjs";
import marketHistory from "./bybit/market/history.mjs";
import marketInfo from "./bybit/market/info.mjs";
import marketTickers from "./bybit/market/tickers.mjs";
import networkAll from "./bybit/network/all.mjs";
import orderAll from "./bybit/order/all.mjs";
import orderBook from "./bybit/order/book.mjs";
import orderCancelAll from "./bybit/order/cancel-all.mjs";
import orderCancelOne from "./bybit/order/cancel-one.mjs";
import orderHistoryAll from "./bybit/order/history-all.mjs";
import orderHistoryOne from "./bybit/order/history-one.mjs";
import orderOne from "./bybit/order/one.mjs";
import orderLimitBuy from "./bybit/order/limit-buy.mjs";
import orderLimitSell from "./bybit/order/limit-sell.mjs";
import orderMarketBuy from "./bybit/order/market-buy.mjs";
import orderMarketSell from "./bybit/order/market-sell.mjs";
import tradeRates from "./bybit/trade/rates.mjs";
import tradeHistoryAll from "./bybit/trade/history-all.mjs";
import tradeHistoryOne from "./bybit/trade/history-one.mjs";
import transferAll from "./bybit/transfer/all.mjs";
import transferInternal from "./bybit/transfer/internal.mjs";
import withdrawAll from "./bybit/withdraw/all.mjs";
import withdrawNew from "./bybit/withdraw/new.mjs";
import withdrawOne from "./bybit/withdraw/one.mjs";

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
  requestBybit = () => {
    const { handler, params } = parseArguments();

    global.apiTools = { config, settings };
    if (handler) {
      switch (handler) {
        case "accountBalance":
        case "accountBalanceRate": return accountBalanceRate(...params);
        case "accountBalanceWallet": return accountBalanceWallet(...params);
        case "account":
        case "accountInfo": return accountInformation(...params);
        case "accountInformation": return accountInformation(...params);
        case "accountWallets": return accountWallets(...params);
        case "currencyAll": return currencyAll(...params);
        case "currency":
        case "currencyOne": return currencyOne(...params);
        case "depositAll": return depositAll(...params);
        case "depositNew":
        case "depositNewMaster": return depositNewMaster(...params);
        case "depositNewSub": return depositNewSub(...params);
        case "deposit":
        case "depositOne": return depositOne(...params);
        case "key":
        case "keyInfo":
        case "keyInformation": return keyInformation(...params);
        case "marketHistory": return marketHistory(...params);
        case "market":
        case "marketInfo":
        case "marketInformation": return marketInfo(...params);
        case "marketTickers": return marketTickers(...params);
        case "networkAll": return networkAll(...params);
        case "orderAll": return orderAll(...params);
        case "orderBook": return orderBook(...params);
        case "orderCancelAll": return orderCancelAll(...params);
        case "orderCancel":
        case "orderCancelOne": return orderCancelOne(...params);
        case "orderHistoryAll": return orderHistoryAll(...params);
        case "orderHistory":
        case "orderHistoryOne": return orderHistoryOne(...params);
        case "order":
        case "orderOne": return orderOne(...params);
        case "orderLimit":
        case "orderLimitBuy": return orderLimitBuy(...params);
        case "orderLimitSell": return orderLimitSell(...params);
        case "orderMarket":
        case "orderMarketBuy": return orderMarketBuy(...params);
        case "orderMarketSell": return orderMarketSell(...params);
        case "tradeRates": return tradeRates(...params);
        case "tradeHistoryAll": return tradeHistoryAll(...params);
        case "tradeHistory":
        case "tradeHistoryOne": return tradeHistoryOne(...params);
        case "transferAll": return transferAll(...params);
        case "transfer":
        case "transferInternal": return transferInternal(...params);
        case "withdrawAll": return withdrawAll(...params);
        case "withdraw":
        case "withdrawOne": return withdrawOne(...params);
        case "withdrawNew": return withdrawNew(...params);
        default: throw new Error(requestBybit.name + ": " + optional(handler))
      }
    } else {
      Promise.resolve()
        .then(response => accountWallets())
        .then(response => depositNewSub(base, network, response.result.accounts[0].uid))
        .then(response => depositNewMaster())
        .then(response => accountBalanceWallet())
        .then(response => accountBalanceWallet(base))
        .then(response => accountInfo(ACCOUNT.WALLET[0]))
        .then(response => accountInfo(ACCOUNT.WALLET[1]))
        .then(response => accountInfo(ACCOUNT.WALLET[2]))
        .then(response => accountInfo(ACCOUNT.WALLET[3]))
        .then(response => accountInfo(ACCOUNT.WALLET[4]))
        .then(response => currencyAll())
        .then(response => currencyOne())
        .then(response => marketHistory())
        .then(response => marketInfo())
        .then(response => marketTickers())
        .then(response => orderBook())
        .then(response => orderLimitSell("0.0002", "10000", TRADE.BUY))
        .then(response => orderAll())
        .then(response => orderOne(response.result.list[0]?.orderId))
        .then(response => orderCancelOne(response.result.list[0]?.orderId))
        .then(response => orderPlaceMarket("1", TRADE.BUY))
        .then(response => tradeHistoryOne(response.result.list[0]?.orderId))
        .then(response => orderPlaceMarket("1", TRADE.SELL))
        .then(response => tradeHistoryOne(response.result.list[0]?.orderId))
        .then(response => orderCancelAll())
        .catch(console.log.bind(console))
    }
  };

requestBybit();

export default null;

/**
 * Request Bybit API spot endpoints.
 * Each account can have up to 20 keys.
 * API keys that are bound to IP addresses are permanently valid.
 * API keys that are not bound to IP addresses are valid for 3 months.
 * After changing login password API keys will expire within 7 days.
 * API keys generated by the Bybit operates with HMAC encryption: you will be provided with a pair of public and private keys.
 * Self-generated API keys operate with RSA encryption: user creates them by the software and only provides the public key.
 * Withdrawal permission requires IP restriction be allowed.
 *
 * @see https://www.bybit.com/app/user/api-management
 * @see https://www.bybit.com/app/user/add-secret-key?type=auto
 * @see https://www.bybit.com/app/user/add-secret-key?type=system
 * @see https://www.bybit.com/user/assets/money-address
 * @typedef {import("#types/bybit.ts").default} IBybit
 * @typedef {import("#types/response/bybit.js").default} JResponse
 * @module request/bybit/index
 */

import { argv } from 'node:process';

import config from '#config/bybit.json' with { type: 'json' };
import { NUMBER } from '#lib/constants.mjs';
import { dirObject } from '#lib/output.mjs';
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import prefs from '#prefs/bybit.json' with { type: 'json' };
import status from '#res/bybit/status.json' with { type: 'json' };
import settings from '#settings/bybit.json' with { type: 'json' };

import accountInformation from './account/information.mjs';
import accountWallets from './account/wallets.mjs';
import balanceAll from './balance/all.mjs';
import balanceInformation from './balance/information.mjs';
import balanceOne from './balance/one.mjs';
import currencyAll from './currency/all.mjs';
import currencyNetworkAll from './currency/network-all.mjs';
import currencyNetworkOne from './currency/network-one.mjs';
import currencyOne from './currency/one.mjs';
import depositAll from './deposit/all.mjs';
import depositNewMaster from './deposit/new-master.mjs';
import depositNewSub from './deposit/new-sub.mjs';
import depositOne from './deposit/one.mjs';
import keyInformation from './key/information.mjs';
import marketHistory from './market/history.mjs';
import marketInformation from './market/information.mjs';
import marketTickers from './market/tickers.mjs';
import orderAll from './order/all.mjs';
import orderBook from './order/book.mjs';
import orderCancelAll from './order/cancel-all.mjs';
import orderCancelOne from './order/cancel-one.mjs';
import orderHistoryAll from './order/history-all.mjs';
import orderHistoryOne from './order/history-one.mjs';
import orderOne from './order/one.mjs';
import orderLimitBuy from './order/limit-buy.mjs';
import orderLimitSell from './order/limit-sell.mjs';
import orderMarketBuy from './order/market-buy.mjs';
import orderMarketSell from './order/market-sell.mjs';
import tradeRates from './trade/rates.mjs';
import tradeHistoryAll from './trade/history-all.mjs';
import tradeHistoryOne from './trade/history-one.mjs';
import transferAll from './transfer/all.mjs';
import transferInternal from './transfer/internal.mjs';
import transferOne from './transfer/one.mjs';
import withdrawAll from './withdraw/all.mjs';
import withdrawNew from './withdraw/new.mjs';
import withdrawOne from './withdraw/one.mjs';

const {
    DATE: { DAY },
  } = NUMBER,
  {
    COIN: { BASE, QUOTE },
  } = /** @type {IBybit["config"]} */ (config),
  { debug } = /** @type {IBybit["prefs"]} */ (prefs),
  {
    account,
    account: { wallet },
  } = /** @type {IBybit["settings"]} */ (settings),
  timestamp = Date.now();

/**
 * @returns {Promise<JResponse>}
 */
const requestBybit = async () => {
  /**
   * Global types for each API are defined in `#types/global.d.ts`
   * @type {any}
   */
  const bybit = {
      config,
      name: 'bybit',
      prefs,
      settings,
      status,
    },
    { handler, options, params } = parseArguments(argv);

  global.apiTools = { bybit, options, timestamp };

  if (debug || options.debug) dirObject('global.apiTools', global.apiTools);
  if (handler) {
    switch (handler) {
      case 'account':
      case 'accountInfo':
      case 'accountInformation':
        return await accountInformation.apply(null, params);
      case 'accountWallets':
        return accountWallets.apply(null, params);
      case 'balanceAll':
        return await balanceAll.apply(null, params);
      case 'balanceInfo':
      case 'balanceInformation':
        return await balanceInformation.apply(null, params);
      case 'balance':
      case 'balanceOne':
        return await balanceOne.apply(null, params);
      case 'currencyAll':
        return await currencyAll.apply(null, params);
      case 'currencyNetworkAll':
        return await currencyNetworkAll.apply(null, params);
      case 'currencyNetwork':
      case 'currencyNetworkOne':
        return await currencyNetworkOne.apply(null, params);
      case 'currency':
      case 'currencyOne':
        return await currencyOne.apply(null, params);
      case 'depositAll':
        return await depositAll.apply(null, params);
      case 'depositNew':
      case 'depositNewMaster':
        return await depositNewMaster.apply(null, params);
      case 'depositNewSub':
        return await depositNewSub.apply(null, params);
      case 'deposit':
      case 'depositOne':
        return await depositOne.apply(null, params);
      case 'key':
      case 'keyInfo':
      case 'keyInformation':
        return await keyInformation.apply(null, params);
      case 'marketHistory':
        return await marketHistory.apply(null, params);
      case 'market':
      case 'marketInfo':
      case 'marketInformation':
        return await marketInformation.apply(null, params);
      case 'marketTickers':
        return await marketTickers.apply(null, params);
      case 'orderAll':
        return await orderAll.apply(null, params);
      case 'orderBook':
        return await orderBook.apply(null, params);
      case 'orderCancelAll':
        return await orderCancelAll.apply(null, params);
      case 'orderCancel':
      case 'orderCancelOne':
        return await orderCancelOne.apply(null, params);
      case 'orderHistoryAll':
        return await orderHistoryAll.apply(null, params);
      case 'orderHistory':
      case 'orderHistoryOne':
        return await orderHistoryOne.apply(null, params);
      case 'order':
      case 'orderOne':
        return await orderOne.apply(null, params);
      case 'orderLimit':
      case 'orderLimitBuy':
        return await orderLimitBuy.apply(null, params);
      case 'orderLimitSell':
        return await orderLimitSell.apply(null, params);
      case 'orderMarket':
      case 'orderMarketBuy':
        return await orderMarketBuy.apply(null, params);
      case 'orderMarketSell':
        return orderMarketSell.apply(null, params);
      case 'tradeRates':
        return await tradeRates.apply(null, params);
      case 'tradeHistoryAll':
        return tradeHistoryAll.apply(null, params);
      case 'tradeHistory':
      case 'tradeHistoryOne':
        return await tradeHistoryOne.apply(null, params);
      case 'transferAll':
        return await transferAll.apply(null, params);
      case 'transfer':
      case 'transferOne':
        return await transferOne.apply(null, params);
      case 'transferInternal':
        return await transferInternal.apply(null, params);
      case 'withdrawAll':
        return await withdrawAll.apply(null, params);
      case 'withdraw':
      case 'withdrawOne':
        return await withdrawOne.apply(null, params);
      case 'withdrawNew':
        return await withdrawNew.apply(null, params);
      default:
        throw new Error(requestBybit.name + ': ' + optional(handler));
    }
  } else {
    switch (options.flow) {
      case 'account':
        return await accountFlow();
      case 'balance':
        return await balanceFlow();
      case 'currency':
        return await currencyFlow();
      case 'deposit':
        return await depositFlow();
      case 'key':
        return await keyInformation();
      case 'market':
        return await marketFlow();
      case 'order':
        return await orderFlow();
      case 'trade':
        return await tradeFlow();
      case 'transfer':
        return await transferFlow();
      case 'withdraw':
        return await withdrawFlow();
      default:
        return await Promise.resolve()
          .then((response) => accountFlow())
          .then((response) => balanceFlow())
          .then((response) => currencyFlow())
          .then((response) => depositFlow())
          .then((response) => keyInformation())
          .then((response) => marketFlow())
          .then((response) => orderFlow())
          .then((response) => tradeFlow())
          .then((response) => transferFlow())
          .then((response) => withdrawFlow())
          .catch(console.error.bind(console));
    }
  }
};

/**
 * @returns {Promise<JResponse>}
 */
const accountFlow = () =>
  Promise.resolve()
    .then((response) => accountInformation())
    .then((response) => accountWallets([account[account.wallet]].join()))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const balanceFlow = () =>
  Promise.resolve()
    .then((response) =>
      balanceAll(account.wallet, account[account.wallet], { coin: BASE.NAME, withBonus: '1' }),
    )
    .then((response) => balanceInformation(account.wallet, QUOTE.NAME))
    .then((response) =>
      balanceOne(account.wallet, QUOTE.NAME, account[account.wallet], { withBonus: '1' }),
    )
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const currencyFlow = () =>
  Promise.resolve()
    .then((response) => currencyAll())
    .then((response) => currencyNetworkAll())
    .then((response) => currencyNetworkOne(BASE.NAME, QUOTE.CHAIN))
    .then((response) => currencyOne(BASE.NAME))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const depositFlow = () =>
  Promise.resolve()
    .then((response) =>
      depositAll(QUOTE.NAME, {
        endTime: String(timestamp),
        limit: '1',
        startTime: String(timestamp - DAY * 30),
      }),
    )
    .then((response) => depositNewMaster(QUOTE.NAME, QUOTE.CHAINTYPE))
    //.then((response) => depositNewSub(account[account.wallet], QUOTE.CODE, BASE.CODE))
    .then((response) =>
      depositOne(account.id[account[wallet]].deposit, {
        coin: QUOTE.NAME,
        endTime: String(timestamp),
        limit: '1',
        startTime: String(timestamp - DAY * 30),
      }),
    )
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const marketFlow = () =>
  Promise.resolve()
    .then((response) =>
      marketHistory(BASE.NAME + QUOTE.NAME, '2', {
        baseCoin: BASE.NAME,
        category: 'spot',
        optionType: 'Call',
      }),
    )
    .then((response) =>
      marketInformation('spot', {
        baseCoin: BASE.NAME,
        limit: '2',
        status: 'Trading',
        symbol: BASE.NAME + QUOTE.NAME,
      }),
    )
    .then((response) =>
      marketTickers(BASE.NAME + QUOTE.NAME, {
        baseCoin: BASE.NAME,
        category: 'spot',
      }),
    )
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const orderFlow = () =>
  Promise.resolve()
    .then((response) => orderAll(BASE.NAME + QUOTE.NAME, 'Buy', '2'))
    .then((response) => orderBook(BASE.NAME + QUOTE.NAME, 'inverse', '2'))
    .then((response) => orderHistoryAll(BASE.NAME + QUOTE.NAME, '2'))
    .then((response) => orderHistoryOne(response.result.list[0]?.orderId ?? '0000000000000000000'))
    .then((response) => orderCancelAll())
    .then((response) => orderMarketBuy('10'))
    .then((response) => orderMarketSell('0.001'))
    .then((response) => orderLimitBuy('0.01', '1000'))
    .then((response) => orderOne(response.result.orderId))
    .then((response) => orderLimitSell('0.001', '5000'))
    .then((response) => orderCancelOne(response.result.orderId))
    .then((response) => orderCancelAll(BASE.NAME + QUOTE.NAME))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const tradeFlow = () =>
  Promise.resolve()
    .then((response) => tradeHistoryAll())
    .then((response) => tradeHistoryOne(response.result.list[0]?.orderId ?? '0000000000000000000'))
    .then((response) => tradeRates(BASE.NAME + QUOTE.NAME))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const transferFlow = () =>
  Promise.resolve()
    .then((response) => transferAll(account.wallet, 'CONTRACT'))
    .then((response) => transferInternal(account.wallet, 'FUND', '0.000001'))
    .then((response) => transferOne(account.wallet, BASE.NAME))
    .catch(console.error.bind(console));

/**
 * @returns {Promise<JResponse>}
 */
const withdrawFlow = () =>
  Promise.resolve()
    .then((response) => withdrawAll())
    .then((response) => withdrawOne(response.result.rows[0]?.txID ?? account.withdraw))
    .then((response) => withdrawNew('1', BASE.NAME))
    .catch(console.error.bind(console));

export default requestBybit;

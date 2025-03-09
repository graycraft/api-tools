/**
 * Type definitions for Bybit API.
 *
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @see https://bybit-exchange.github.io/docs/v5/enum#canceltype
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#depositstatus
 * @see https://bybit-exchange.github.io/docs/v5/enum#exectype
 * @see https://bybit-exchange.github.io/docs/v5/enum#margintrading
 * @see https://bybit-exchange.github.io/docs/v5/enum#ordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#positionidx
 * @see https://bybit-exchange.github.io/docs/v5/enum#rejectreason
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/enum#status
 * @see https://bybit-exchange.github.io/docs/v5/enum#stopordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @see https://bybit-exchange.github.io/docs/v5/enum#timeinforce
 * @see https://bybit-exchange.github.io/docs/v5/enum#transferstatus
 * @see https://bybit-exchange.github.io/docs/v5/enum#triggerby
 * @see https://bybit-exchange.github.io/docs/v5/enum#viplevel
 * @see https://bybit-exchange.github.io/docs/v5/enum#withdrawstatus
 * @global
 */

import type { Configuration, Preferences, Settings, Status } from './api.ts';
import type { Dict } from './common.ts';

export type accountId = string;
export type accountType = 'CONTRACT' | 'FUND' | 'OPTION' | 'SPOT' | 'UNIFIED';
export type cancelType =
  | 'CancelAllBeforeAdl'
  | 'CancelAllBeforeLiq'
  | 'CancelByAdmin'
  | 'CancelByAccountBlocking'
  | 'CancelByCannotAffordOrderCost'
  | 'CancelByCrossReachMaxTradeNum'
  | 'CancelByCrossSelfMuch'
  | 'CancelByDCP'
  | 'CancelByDelivery'
  | 'CancelByMmpTriggered'
  | 'CancelByPmTrialMmOverEquity'
  | 'CancelByPrepareAdl'
  | 'CancelByPrepareLiq'
  | 'CancelByReduceOnly'
  | 'CancelBySettle'
  | 'CancelBySmp'
  | 'CancelByTpSlTsClear'
  | 'CancelByUser'
  | 'UNKNOWN';
export type category = 'inverse' | 'linear' | 'option' | 'spot';
export type contractType =
  | 'InverseFutures'
  | 'InversePerpetual'
  | 'LinearFutures'
  | 'LinearPerpetual';
export type depositStatus = 0 | 1 | 2 | 3 | 4 | 10011 | 10012;
export type execType =
  | 'AdlTrade'
  | 'BlockTrade'
  | 'BustTrade'
  | 'Delivery'
  | 'Funding'
  | 'MovePosition'
  | 'Settle'
  | 'Trade'
  | 'UNKNOWN';
export type kycLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_DEFAULT';
export type marginTrading = 'both' | 'none' | 'normalSpotOnly' | 'utaOnly';
export type optionType = 'Call' | 'Put';
export type orderSide = ['Buy', 'Sell'];
export type orderStatus =
  | 'Cancelled'
  | 'Deactivated'
  | 'Filled'
  | 'New'
  | 'PartiallyFilled'
  | 'PartiallyFilledCanceled'
  | 'Rejected'
  | 'Triggered'
  | 'Untriggered';
export type orderType = ['Market', 'Limit', 'UNKNOWN'];
export type path =
  | 'ACCOUNT_INFORMATION'
  | 'ACCOUNT_WALLETS'
  | 'BALANCE_ALL'
  | 'BALANCE_INFORMATION'
  | 'BALANCE_ONE'
  | 'CURRENCY_ALL'
  | 'CURRENCY_NETWORK_ALL'
  | 'CURRENCY_NETWORK_ONE'
  | 'CURRENCY_ONE'
  | 'DEPOSIT_ALL'
  | 'DEPOSIT_NEW_MASTER'
  | 'DEPOSIT_NEW_SUB'
  | 'DEPOSIT_ONE'
  | 'KEY_INFORMATION'
  | 'MARKET_HISTORY'
  | 'MARKET_INFORMATION'
  | 'MARKET_TICKERS'
  | 'ORDER_ALL'
  | 'ORDER_BOOK'
  | 'ORDER_CANCEL_ALL'
  | 'ORDER_CANCEL_ONE'
  | 'ORDER_HISTORY_ALL'
  | 'ORDER_HISTORY_ONE'
  | 'ORDER_ONE'
  | 'ORDER_PLACE'
  | 'TRADE_RATES'
  | 'TRADE_HISTORY_ALL'
  | 'TRADE_HISTORY_ONE'
  | 'TRANSFER_ALL'
  | 'TRANSFER_INTERNAL'
  | 'TRANSFER_ONE'
  | 'WITHDRAW_ALL'
  | 'WITHDRAW_NEW'
  | 'WITHDRAW_ONE';
export type positionIdx = 0 | 1 | 2;
export type rejectReason =
  | 'EC_NoError'
  | 'EC_Others'
  | 'EC_UnknownMessageType'
  | 'EC_MissingClOrdID'
  | 'EC_MissingOrigClOrdID'
  | 'EC_ClOrdIDOrigClOrdIDAreTheSame'
  | 'EC_DuplicatedClOrdID'
  | 'EC_OrigClOrdIDDoesNotExist'
  | 'EC_TooLateToCancel'
  | 'EC_UnknownOrderType'
  | 'EC_UnknownSide'
  | 'EC_UnknownTimeInForce'
  | 'EC_WronglyRoute'
  | 'EC_MarketOrderPriceIsNotZero'
  | 'EC_LimitOrderInvalidPrice'
  | 'EC_NoEnoughQtyToFill'
  | 'EC_NoImmediateQtyToFill'
  | 'EC_PerCancelRequest'
  | 'EC_MarketOrderCannotBePostOnly'
  | 'EC_PostOnlyWillTakeLiquidity'
  | 'EC_CancelReplaceOrder'
  | 'EC_InvalidSymbolStatus'
  | 'EC_CancelForNoFullFill'
  | 'EC_BySelfMatch'
  | 'EC_InCallAuctionStatus';
export type smpType = 'CancelBoth' | 'CancelMaker' | 'CancelTaker' | 'None';
export type status = 'Closed' | 'Delivering' | 'PreLaunch' | 'Trading';
export type stopOrderType =
  | ''
  | 'BidirectionalTpslOrder'
  | 'MmRateClose'
  | 'OcoOrder'
  | 'Order'
  | 'PartialStopLoss'
  | 'PartialTakeProfit'
  | 'Stop'
  | 'StopLoss'
  | 'StopOrder'
  | 'TakeProfit'
  | 'TrailingStop'
  | 'tpslOrder';
export type timeInForce = 'GTC' | 'IOC' | 'FOK';
export type transferStatus = 'FAILED' | 'PENDING' | 'SUCCESS';
export type triggerBy = '' | 'IndexPrice' | 'LastPrice' | 'MarkPrice';
export type vipLevel =
  | 'No VIP'
  | 'PRO-1'
  | 'PRO-2'
  | 'PRO-3'
  | 'PRO-4'
  | 'PRO-5'
  | 'VIP-1'
  | 'VIP-2'
  | 'VIP-3'
  | 'VIP-4'
  | 'VIP-5'
  | 'VIP-Supreme';
export type withdrawStatus =
  | 'BlockchainConfirmed'
  | 'CancelByUser'
  | 'Fail'
  | 'MoreInformationRequired'
  | 'Pending'
  | 'Reject'
  | 'SecurityCheck'
  | 'Unknown'
  | 'success';

export default interface Bybit {
  config: Configuration & {
    ACCOUNT: {
      CATEGORY: category[];
      WALLET: accountType[];
    };
    ASSET: {
      BASE: {
        CODE: 'ETH';
        NETWORK: 'ethereum';
      };
      QUOTE: {
        CODE: 'USDT';
        NETWORK: 'ethereum';
      };
    };
    OPTION: optionType[];
    ORDER: {
      LIMIT: orderType[1];
      MARKET: orderType[0];
      SIDE: {
        BUY: orderSide[0];
        SELL: orderSide[1];
      };
      STOP: stopOrderType[];
      STATUS: orderStatus[];
    };
    PATH: Dict;
    RESPONSE: {
      CODE: 'retCode';
      DESCRIPTION: 'retMsg';
      OK: 0;
      SUCCESSFUL: 'OK';
    };
    TRADE: {
      EXEC: execType[];
      STATUS: status[];
    };
  };
  name: 'bybit';
  prefs: Preferences & {
    aggregate: path[];
    currency: Dict;
    parse: path[];
    snapshot: path[];
    verbose: path[];
  };
  settings: Settings & {
    account: {
      [key in accountType]: accountId;
    } & {
      category: category;
      id: { [key in accountId]: { main: boolean } };
      wallet: accountType;
    };
    address: {
      deposit: string;
      withdraw: string;
    };
    authentication: {
      security: 'HMAC' | 'RSA' | null;
    };
  };
  status: Status;
}

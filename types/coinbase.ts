/**
 * Type definitions for Coinbase Advanced API.
 *
 * @global
 */

import type { dictionary } from '#types/common.ts';
import type WebSocketMessage from '#types/socket/message.js';

import type { Configuration, Preferences, Settings, Status } from './api.ts';

export enum orderTypes {
  limit = 'limit_limit_gtc',
  market = 'market_market_ioc',
}
export enum orderSide {
  buy = 'BUY',
  sell = 'SELL',
}
export enum productTypes {
  future = 'FUTURE',
  spot = 'SPOT',
  unknown = 'UNKNOWN_PRODUCT_TYPE',
}

export type assetCode = 'BTC' | 'ETH' | 'SOL' | 'USDC';
export type assetNetwork = 'base' | 'bitcoin' | 'ethereum' | 'solana';
export type contractExpiry = 'EXPIRING' | 'PERPETUAL' | 'UNKNOWN_CONTRACT_EXPIRY_TYPE';
export type contractStatus =
  | 'STATUS_ALL'
  | 'STATUS_EXPIRED'
  | 'STATUS_UNEXPIRED'
  | 'UNKNOWN_EXPIRING_CONTRACT_STATUS';
export type orderPlacement = 'RETAIL_ADVANCED' | 'RETAIL_SIMPLE' | 'UNKNOWN_PLACEMENT_SOURCE';
export type orderStatus =
  | 'CANCEL_QUEUED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'FAILED'
  | 'FILLED'
  | 'OPEN'
  | 'PENDING'
  | 'QUEUED'
  | 'UNKNOWN_ORDER_STATUS';
export type orderTimeInForces =
  | 'FILL_OR_KILL'
  | 'GOOD_UNTIL_CANCELLED'
  | 'GOOD_UNTIL_DATE_TIME'
  | 'IMMEDIATE_OR_CANCEL'
  | 'UNKNOWN_TIME_IN_FORCE';
export type orderType =
  | 'BRACKET'
  | 'LIMIT'
  | 'MARKET'
  | 'STOP'
  | 'STOP_LIMIT'
  | 'UNKNOWN_ORDER_TYPE';
export type pathName =
  | 'ADDRESS_ALL'
  | 'ADDRESS_NEW'
  | 'ADDRESS_ONE'
  | 'ADDRESS_TRANSACTIONS'
  | 'CURRENCY_ALL'
  | 'CURRENCY_ONE'
  | 'DEPOSIT_CRYPTO_ALL'
  | 'DEPOSIT_CRYPTO_ONE'
  | 'DEPOSIT_FIAT_ALL'
  | 'MARKET_ALL'
  | 'MARKET_ONE'
  | 'MARKET_TICKERS'
  | 'NETWORK_ALL'
  | 'ORDER_ALL'
  | 'ORDER_BOOK'
  | 'ORDER_CANCEL'
  | 'ORDER_ONE'
  | 'ORDER_PLACE'
  | 'PRODUCT_CANDLES'
  | 'TRANSACTION_ALL'
  | 'TRANSACTION_ONE'
  | 'USER_ACCOUNT_ALL'
  | 'USER_ACCOUNT_ONE'
  | 'USER_PORTFOLIO_ALL'
  | 'USER_PORTFOLIO_ONE'
  | 'WITHDRAW_ALL'
  | 'WITHDRAW_NEW';
export type productId = 'BTC-USDC' | 'ETH-USDC' | 'SOL-USDC';
export type productType = productTypes.future | productTypes.spot | productTypes.unknown;
export type sortType = 'LAST_FILL_TIME' | 'LIMIT_PRICE' | 'UNKNOWN_SORT_BY';
export type tradeSide = 'BUY' | 'SELL';
export type userPortfolio = 'CONSUMER' | 'DEFAULT' | 'INTX' | 'UNDEFINED';

export default interface ICoinbase {
  config: Configuration & {
    CONTRACT: {
      EXPIRY: contractExpiry[];
      STATUS: contractStatus[];
    };
    ORDER: {
      LIMIT: orderTypes.limit;
      MARKET: orderTypes.market;
      PLACEMENT: orderPlacement[];
      SIDE: {
        BUY: orderSide.buy;
        SELL: orderSide.sell;
      };
      STATUS: orderStatus[];
      TIME_IN_FORCES: orderTimeInForces[];
      TYPE: orderType[];
    };
    PATH: { [key in pathName]: string };
    PRODUCT: {
      BASE: {
        CODE: assetCode;
        NETWORK: assetNetwork;
        UUID: string;
      };
      FUTURE: productTypes.future;
      QUOTE: {
        CODE: assetCode;
        NETWORK: assetNetwork;
        UUID: string;
      };
      SPOT: productTypes.spot;
      UNKNOWN: productTypes.unknown;
    };
    SOCKET: {
      CHANNEL: dictionary<WebSocketMessage['channel']>;
      SUBSCRIBE: string;
      UNSUBSCRIBE: string;
      URL: string;
    };
    SORT: sortType[];
    USER: {
      PORTFOLIO: userPortfolio[];
    };
  };
  name: 'coinbase';
  prefs: Preferences;
  settings: Settings & {
    authentication: {
      security: 'JWT' | null;
    };
    user: {
      [key in userPortfolio]: {
        account: {
          address: string[];
          asset: string;
          uuid: string;
        };
        travel_rule_data: {
          beneficiary_address: {
            address1: string;
            address2: string;
            address3: string;
            city: string;
            country: string;
            state: string;
            postal_code: string;
          };
          beneficiary_financial_institution: string;
          beneficiary_name: string;
          beneficiary_wallet_type: string;
          is_self: string;
          transfer_purpose: string;
        };
        uuid: string;
      } | null;
    } & { portfolio: userPortfolio; withdraw: string };
  };
  status: Status;
}

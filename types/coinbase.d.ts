/**
 * Type definitions for Coinbase Advanced API.
 *
 * @global
 */

import { Configuration, Preferences, Settings, Status } from './api.d.ts';
import { Dict, DictLike } from './common.d.js';

export type portfolio = 'DEFAULT';
export type productType = 'FUTURE' | 'SPOT' | 'UNKNOWN_PRODUCT_TYPE';
export type tradeSide = 'BUY' | 'SELL';
export type userPortfolio = 'CONSUMER' | 'DEFAULT' | 'INTX' | 'UNDEFINED';

interface Coinbase {
  config: Configuration & any;
  name: string;
  prefs: Preferences & any;
  settings: Settings & {
    asset: {
      [key in 'base' | 'quote']: {
        code: string;
        network: string;
        uuid: string;
      };
    };
    authentication: {
      security: 'JWT' | null;
    };
    user: {
      [key in portfolio]: {
        account: {
          address: string[];
          asset: string;
          uuid: string;
        };
        uuid: string;
      };
    } & { portfolio: portfolio };
  };
  status: Status;
}

export default Coinbase;

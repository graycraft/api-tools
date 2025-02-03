/**
 * Type definitions for Coinbase Advanced API.
 *
 * @global
 */

import type { Configuration, Preferences, Settings, Status } from './api.d.ts';

export type portfolio = 'DEFAULT';
export type productType = 'FUTURE' | 'SPOT' | 'UNKNOWN_PRODUCT_TYPE';
export type tradeSide = 'BUY' | 'SELL';
export type userPortfolio = 'CONSUMER' | 'DEFAULT' | 'INTX' | 'UNDEFINED';

interface Coinbase {
  config: Configuration & any;
  name: string;
  prefs: Preferences & any;
  settings: Settings & {
    address: {
      deposit: string;
      withdraw: string;
    };
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
      };
    } & { portfolio: portfolio };
  };
  status: Status;
}

export default Coinbase;

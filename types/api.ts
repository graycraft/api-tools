/**
 * JSDoc is not supported for global type checks.
 * The only way to force the IDE to do this is to use a TypeScript declaration file.
 * After Node.js 16, the `NodeJS.Global` interface was replaced by `globalThis`.
 *
 * @global
 */

import type { Dict, DictLike } from './common.ts';

export type Configuration = {
  HOSTNAME: string;
  PATH: Dict;
  PREFIX: string;
  RESPONSE: {
    CODE: string;
    DESCRIPTION: string;
    OK: number;
    SUCCESSFUL: string;
  };
  SOCKET: {
    CHANNEL: Dict;
    SUBSCRIBE: string;
    UNSUBSCRIBE: string;
    URL: string;
  };
};
export type Options = {
  aggregate?: boolean;
  authentication?: boolean;
  continue?: boolean;
  debug?: boolean;
  flow?: string;
  headers?: boolean;
  snapshot?: boolean;
  throw?: boolean;
  validate?: boolean;
  verbose?: boolean;
};
export type Name = 'bybit' | 'coinbase' | 'fameex';
export type Parameters = DictLike;
export type Preferences = {
  aggregate: string[];
  continue: boolean;
  debug: true;
  enabled: ('aggregate' | 'parse' | 'snapshot' | 'validate' | 'verbose')[];
  parse: string[];
  snapshot: string[];
  validate: string[];
  verbose: string[];
};
export type Settings = {
  authentication: {
    delay: number;
    keys: Dict;
    security: 'JWT' | 'HMAC' | 'RSA';
    secrets: Dict;
  };
};
export type Status = Dict<DictLike>;

export default interface Api {
  config: Configuration;
  name: string;
  prefs: Preferences;
  settings: Settings;
  status: Status;
}

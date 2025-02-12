/**
 * JSDoc is not supported for global type checks.
 * The only way to force the IDE to do this is to use a TypeScript declaration file.
 * After Node.js 16, the `NodeJS.Global` interface was replaced by `globalThis`.
 *
 * @global
 */

import { Dict, DictLike } from './common.js';

export type Configuration = {
  ENCODING: 'hex';
  HOSTNAME: string;
  PATH: Dict;
  PREFIX: string;
  RESPONSE: {
    CODE: string;
    DESCRIPTION: string;
    OK: number;
    SUCCESSFUL: string;
  };
};
export type Options = {
  aggregate: boolean;
  authentication: boolean;
  debug: boolean;
  flow: boolean;
  headers: boolean;
  snapshot: boolean;
  validate: boolean;
  verbose: boolean;
};
export type Name = 'bybit' | 'coinbase';
export type Parameters = DictLike;
export type Preferences = {
  aggregate: string[];
  debug: true;
  enabled: ('aggregate' | 'parse' | 'snapshot' | 'verbose' | 'validate')[];
  exit: boolean;
  parse: string[];
  snapshot: string[];
  validate: string[];
};
export type Settings = {
  authentication: {
    delay: number;
    keys: Dict;
    secrets: Dict;
  };
};
export type Status = Dict<DictLike>;

interface Api {
  config: Configuration;
  name: string;
  prefs: Preferences;
  settings: Settings;
  status: Status;
}

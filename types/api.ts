/**
 * JSDoc is not supported for global type checks.
 * The only way to force the IDE to do this is to use a TypeScript declaration file.
 * After Node.js 16, the `NodeJS.Global` interface was replaced by `globalThis`.
 *
 * @global
 */

import type { authSecurity } from '#lib/constants.mjs';

import type { dictionary, dictLike } from './common.ts';

export type configuration = {
  HOSTNAME: string;
  PATH: dictionary;
  PREFIX: string;
  RESPONSE: {
    CODE: string;
    DESCRIPTION: string;
    OK: number;
    SUCCESSFUL: string;
  };
};
export type options = {
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
export type name = 'bybit' | 'coinbase' | 'fameex';
export type parameters = dictLike;
export type preferences = {
  aggregate: string[];
  continue: boolean;
  debug: true;
  enabled: ('aggregate' | 'parse' | 'snapshot' | 'validate' | 'verbose')[];
  parse: string[];
  snapshot: string[];
  validate: string[];
  verbose: string[];
};
export type settings = {
  authentication: {
    delay: number;
    keys: dictionary;
    security: authSecurity;
    secrets: dictionary;
  };
};
export type status = dictionary<dictLike>;

export default interface IApi {
  config: configuration;
  name: string;
  prefs: preferences;
  settings: settings;
  status: status;
}

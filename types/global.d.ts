/**
 * JSDoc is not supported for global type checks.
 * The only way to force the IDE to do this is to use a TypeScript declaration file.
 * After Node.js 16, the `NodeJS.Global` interface was replaced by `globalThis`.
 *
 * @global
 */

declare var apiTools: {
  bybit?: import('#types/bybit.d.js').default;
  coinbase?: import('#types/coinbase.d.js').default;
  options: {
    aggregate?: boolean;
    authentication?: boolean;
    debug?: boolean;
    exit?: boolean;
    flow?: string;
    headers?: boolean;
    snapshot?: boolean;
    throw?: boolean;
    validate?: boolean;
    verbose?: boolean;
  };
  output: {};
  timestamp: number;
};

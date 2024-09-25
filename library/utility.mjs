/**!
 * Utility methods for common application use cases.
 *
 * @module lib/utility
 */

import { dirObject } from './output.mjs';

/**
 * Obtain path name key from paths object by value.
 * @param {string} path
 * @param {{ [key: string]: string}} PATH
 * @returns {string}
 */
export const obtainName = (path, PATH) => {
  const name = Object.entries(PATH).find((entry) => entry[1] === path)[0];

  return name;
};

/**
 * Parse process argument vectors to usable handler, parameters, options and flow.
 * @typedef Result
 * @prop {string} handler API request handler.
 * @prop {object} options Options to apply while executing API request handler.
 * @prop {(string | { [key: string]: string; })[]} params Parameters to execute API request handler with.
 * @prop {string} flow flow for multiple API request handlers.
 * @returns {Result}
 */
export const parseArguments = () => {
  const {
      settings: { debug },
    } = global.apiTools,
    options = {},
    args = process.argv.slice(3).map((param) => {
      /** A param with defined value. */
      if (param.includes('=')) {
        /**
         * Regular expression instead of '=' ensures that only first occurrence of separator splits string, e.g.:
         * `node bybit depositAll USDT cursor=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx==`
         */
        const [key, value] = param.split(/=(.*)/);

        return { [key]: value };
      }
      /** Options. */
      if (param.includes('--debug')) {
        options.isDebug = true;
      }
      if (param.includes('--head')) {
        options.isHeaders = true;
      }
      if (param.includes('--snap')) {
        options.isSnapshot = true;
      }
      if (param.includes('--verb')) {
        options.isVerbose = true;
      }

      return param;
    }),
    /** Params without a value. */
    params = args.filter((arg) => typeof arg === 'string' && !arg.includes('--')),
    /** Params with defined value. */
    paramsDefined = args.reduce(
      (accum, arg) => (typeof arg === 'object' ? Object.assign(accum, arg) : accum),
      {},
    );

  let handler = process.argv[2] ?? '',
    flow = '';

  /** Options. */
  if (handler.includes('--flow')) {
    const value = handler.split('=')[1];

    flow = value;
    handler = '';
  }
  if (Object.keys(paramsDefined).length) params.push(paramsDefined);

  const result = {
    flow,
    handler,
    options,
    params,
  };

  if (debug) dirObject('Arguments', { result });

  return result;
};

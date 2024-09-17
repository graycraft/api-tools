/**!
 * Utility methods for common application use cases.
 *
 * @module lib/utility
 */

import { dirObject } from "./output.mjs";

/**
 * Obtain path name key from paths object by value.
 */
export const obtainName = (path, pathAll) => {
  const name = Object.entries(pathAll).find(entry =>
    entry[1] === path
  )[0];

  return name
}

/**
 * Parse process argument vectors to usable handler, parameters and options.
 */
export const parseArguments = () => {
  const options = {},
    args = process.argv.slice(3).map(param => {
      /** A param with defined value. */
      if (param.includes("=")) {
        const [key, value] = param.split("=");

        return { [key]: value };
      }
      if (param.includes("--head")) {
        /** @todo Resolve side effect. */
        options.isHeaders = true
      }
      if (param.includes("--snap")) {
        /** @todo Resolve side effect. */
        options.isSnapshot = true
      }

      return param
    }),
    /** Params without a value. */
    params = args.filter(
      arg => typeof arg === "string" && !arg.includes("--")
    ),
    /** Params with defined value. */
    paramsDefined = args.reduce((accum, arg) =>
      typeof arg === "object" ? Object.assign(accum, arg) : accum
    , {});

  if (Object.keys(paramsDefined).length) params.push(paramsDefined);

  const result = {
    handler: process.argv[2],
    options,
    params
  };

  dirObject("arguments", result);

  return result
}

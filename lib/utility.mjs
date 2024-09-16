/**
 * Utility methods for common tasks.
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
 * Parse process argument vectors to usable parameters.
 */
export const parseArguments = () => {
  let args = process.argv.slice(3).map(param => {
      if (param.includes("=")) {
        const [key, value] = param.split("=");

        return { [key]: value };
      }
      if (param.includes("--snap")) {
        global.isSnapshot = true
      }

      return param
    }),
    params = args.filter(
      arg => typeof arg === "string" && arg !== "--snap"
    ),
    options = args.reduce((accum, arg) =>
      typeof arg === "object" ? Object.assign(accum, arg) : accum
    , {});

  if (Object.keys(options).length) params.push(options);
  args = {
    handler: process.argv[2],
    params
  };
  dirObject("arguments", args);

  return args
}

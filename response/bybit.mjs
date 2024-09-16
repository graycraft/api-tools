/**
 * Response Bybit API.
 * 
 * @module response/bybit
 */

import config from "../configuration/bybit.json" with { type: "json" };
import { parseArguments } from "../lib/utility.mjs";
import settings from "../settings/bybit.json" with { type: "json" };
import currencyAll from "./bybit/currency/all.mjs";
import networkAll from "./bybit/network/all.mjs";

/**
 * @todo Find a snapshot file with latest timestamp.
 */
const responseBybit = () => {
    const { handler, params } = parseArguments();

    global.apiTools = { config, settings };
    if (handler) {
      switch (handler) {
        case "currency":
        case "currencyAll": return currencyAll(...params);
        case "network":
        case "networkAll": return networkAll(...params);
        default: throw new Error(responseBybit.name + ": " + optional(handler))
      }
    } else {
      Promise.resolve()
        .then(response => currencyAll())
        .then(response => networkAll())
        .catch(console.log.bind(console))
    }
  };

responseBybit();

export default null;

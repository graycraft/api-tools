/**
 * Response Coinbase Advanced API.
 * 
 * @module response/coinbase
 */

import config from "../configuration/coinbase.json" with { type: "json" };
import { optional } from "../lib/template.mjs";
import { parseArguments } from "../lib/utility.mjs";
import settings from "../settings/coinbase.json" with { type: "json" };
import currencyAll from "./coinbase/currency/all.mjs";
//import networkAll from "./coinbase/network/all.mjs";

/**
 * @todo Find a snapshot file with latest timestamp.
 */
const responseCoinbase = () => {
    const { handler, params } = parseArguments();

    global.apiTools = { config, settings };
    if (handler) {
      switch (handler) {
        case "currency":
        case "currencyAll": return currencyAll(...params);
        /* case "network":
        case "networkAll": return networkAll(...params); */
        default: throw new Error(responseCoinbase.name + ": " + optional(handler))
      }
    } else {
      Promise.resolve()
        .then(response => currencyAll())
        //.then(response => networkAll())
        .catch(console.log.bind(console))
    }
  };

responseCoinbase();

export default null;

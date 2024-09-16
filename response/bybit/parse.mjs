/**
 * Parse a Bybit API response, usually for shortening long arrays.
 * 
 * @module response/bybit/parse
 */

import filter from "./parse/filter.mjs";
import find from "./parse/find.mjs";
import map from "./parse/map.mjs";
import config from "../../configuration/bybit.json" with { type: "json" };
import settings from "../../settings/bybit.json" with { type: "json" };
import { dirObject } from "../../lib/output.mjs";
import { obtainName } from "../../lib/utility.mjs";

const responseParse = (json, status, path, data) => {
  const {
      PATH,
      PATH: {
        ACCOUNT_BALANCE_CURRENCIES,
        CURRENCY_ALL,
        MARKET_HISTORY,
        MARKET_INFORMATION,
        MARKET_TICKERS,
        NETWORK_ALL,
        ORDER_ALL,
        TRADE_HISTORY_ALL
      },
      TRADE,
    } = config,
    {
      currency: {
        base,
        quote
      },
      parse,
    } = settings;
  let output = status;

  if (parse.includes(obtainName(path, PATH))) {
    let isFiltered = true,
      isFound = true,
      isMapped = true;

    switch (path) {
      case ACCOUNT_BALANCE_CURRENCIES: json = filter(json, {
        criterion: (item) => Number(item.transferBalance) || Number(item.walletBalance),
        list: "balance",
      }); break;
      case ORDER_ALL:
      case TRADE_HISTORY_ALL: json = filter(json, {
        criterion: data.side || TRADE.BUY,
        key: "side",
        list: "list",
      }); break;
      default: isFiltered = false
    }
    switch (path) {
      /* case CURRENCY_ALL: json = find(json, {
        criterion: base,
        key: "coin",
        list: "rows",
      }); break; */
      case MARKET_HISTORY:
      case MARKET_INFORMATION:
      case MARKET_TICKERS: json = find(json, {
        criterion: data.symbol ?? (base + quote),
        key: "symbol",
        list: "list",
      }); break; 
      default: isFound = false
    }
    switch (path) {
      case CURRENCY_ALL: json = map(json, {
        key: "coin",
        list: "rows",
      }); break;
      case NETWORK_ALL: json = map(json, {
        key: ["coin", "chain"],
        list: ["rows", "chains"],
      }); break;
      default: isMapped = false
    }
    if (isFiltered || isFound || isMapped) {
      const parsed = []

      output += " (";
      if (isFiltered) parsed.push("filtered");;
      if (isFound) parsed.push("found");
      if (isMapped) parsed.push("mapped");
      output += parsed.join(", ") + ")";
    }
  } else console.info(`Parse: "${obtainName(path, PATH)}" is not enabled is settings.`);
  dirObject(output, json);

  return json
};

export default responseParse;

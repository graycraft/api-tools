/**
 * Validate parameters for a Coinbase Advanced API request.
 * 
 * @module request/coinbase/validate
 */

import requestValidate from "../validate.mjs";
//import currencyAll from "../../collection/coinbase/currency_all.json" with { type: "json" };
//import networkAll from "../../collection/coinbase/network_all.json" with { type: "json" };

const isValid = (param) => {
  const { config } = global.apiTools,
    { ACCOUNT, CURRENCY, TRADE } = config,
    [key, value] = Object.entries(param)[0];

  switch (key) {
    case "accountType": return ACCOUNT.WALLET.some(account => account === value);
    //case "chainType": return networkAll.some(currency => currency === value);
    //case "coin": return currencyAll.some(currency => currency === value);
    case "memberId": return Number(value);
    case "memberIds": return Number(value) || value.split(",").every(member => Number(member));
    //case "side": return Object.values(TRADE).some(side => side === value);
    /**
     * @todo Iterate over full list from collection.
     */
    case "symbol": return Object.values(CURRENCY.BASE).some(currency1 => 
      Object.values(CURRENCY.QUOTE).some(currency2 =>
        (currency1 + currency2 === value) && currency1 !== currency2
      )
    );
    case "txID": return /^0x[0-9A-Fa-f]{64}$/.test(value);
    case "withBonus": return Number(value);
    default: return typeof value === "string";
  }
};

const coinbaseValidate = (path, defaults, ...options) => {
  const data = requestValidate(path, isValid, defaults, ...options)

  return data
};

export default coinbaseValidate

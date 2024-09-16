/**
 * Handle Bybit API account wallet types endpoint.
 * 
 * @module request/bybit/account/wallets
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      ACCOUNT_WALLETS,
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/user/wallet-type
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 */
const accountTypes = (memberIds) => {
  const defaults = {},
    data = validate(
      ACCOUNT_WALLETS, isValid, defaults,
      { warnRequired: { memberIds } },
    );

  return bybitGet(sign, ACCOUNT_WALLETS, data)
};

export default accountTypes;

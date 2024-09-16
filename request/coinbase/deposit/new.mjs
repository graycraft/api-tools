/**
 * Handle Bybit API deposit new master endpoint.
 * 
 * @module request/coinbase/new-master
 */

import coinbasePost from "../post.mjs";
import isValid from "../../coinbase/validate.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import settings from "../../../settings/coinbase.json" with { type: "json" };

const {
    PATH: {
      DEPOSIT_NEW
    },
  } = config,
  {
    authentication: {
      sign
    },
    currency: {
      uuid,
    },
  } = settings;

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#create-address
 */
const depositNew = (account_uuid) => {
  const defaults = {
      account_uuid: uuid,
    },
    data = validate(
      DEPOSIT_NEW, isValid, defaults,
      { warnOptional: { account_uuid } },
    );

  return coinbasePost(sign, DEPOSIT_NEW, data);
};

export default depositNew;

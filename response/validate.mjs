/**
 * Validate the structure of Coinbase Advanced API response against a schema.
 * 
 * @module request/validate
 * @see https://ajv.js.org/guide/schema-language.html#draft-2019-09-and-draft-2020-12
 */

import Ajv2019 from "ajv/dist/2019.js";
import { dirObject } from "../lib/output.mjs";

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicmarkettrades
 */
const validateJson = (json, schema) => {
  const ajv = new Ajv2019({ allErrors: true }),
    validate = ajv.compile(schema),
    isValid = validate(json);

  if (!isValid) dirObject("AJV", validate.errors);

  return isValid;
};

export default validateJson

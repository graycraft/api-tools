/**
 * Test API response by validating the structure of an API response against a JSON-schema.
 *
 * @see https://ajv.js.org/guide/schema-language.html#draft-2019-09-and-draft-2020-12
 * @module response/validate
 */

import Ajv from 'ajv/dist/2020.js';
import { dirObject } from '#lib/output.mjs';

/**
 * Validate the structure of an API response against a JSON-schema.
 * @param {{}} json JSON data from response.
 * @param {{}} schema JSON-schema to validate against.
 * @returns {boolean} Whether response is valid or not.
 */
const responseValidate = (json, schema) => {
  const ajv = new Ajv.default({ allErrors: true }),
    validate = ajv.compile(schema),
    isValid = validate(json);

  if (!isValid) dirObject('AJV', validate.errors);

  return isValid;
};

export default responseValidate;

/**
 * Test API response by validating the structure of an API response against a JSON-schema.
 *
 * @see https://ajv.js.org/guide/schema-language.html#draft-2019-09-and-draft-2020-12
 * @module response/validate
 */

import Ajv from 'ajv/dist/2020.js';

import { dirObject } from '#lib/output.mjs';
import { toPascalCase } from '#lib/string.mjs';

/**
 * Validate the structure of an API response against a JSON-schema.
 * @param {{}} json JSON data from response.
 * @param {{}} schema JSON-schema to validate against.
 * @param {string} apiName A specific API name.
 * @param {string} [fileName] File name of response snapshot.
 * @returns {boolean} Whether response is valid or not.
 */
const responseValidate = (json, schema, apiName, fileName) => {
  const ajv = new Ajv.default({ allErrors: true }),
    validate = ajv.compile(schema),
    isValid = validate(json);

  if (isValid) {
    const text = fileName ? ` snapshot ${fileName}` : '';

    console.info('AJV:', `validation of ${toPascalCase(apiName)} API response${text} passed.`);
  } else dirObject('AJV', validate.errors);

  return isValid;
};

export default responseValidate;

/**
 * Analyze an API response by comparing its code and description with known values.
 *
 * @module response/analyze
 */

import { HTTP } from '#lib/constants.mjs';
import { dirObject } from '#lib/output.mjs';

/**
 * Analyze response and decide whether it is successful for further processing.
 * @param {{ code, description, jsonParsed, status, statusText }} response Parsed response data.
 * @typedef Result
 * @prop {boolean} isKnown Whether response status code is known in `status.json` or not.
 * @prop {boolean} isSaved Whether response status description is saved in `status.json` or not.
 * @prop {boolean} isSuccessful Whether response status code and description considered successful or not.
 * @returns {Result}
 */
const responseAnalyze = (response) => {
  const { STATUS } = HTTP,
    {
      config,
      status: statusKnown,
      settings: { debug },
    } = global.apiTools,
    {
      RESPONSE: { CODE, DESCRIPTION, OK },
    } = config,
    { jsonParsed, status, statusText } = response,
    { code = jsonParsed[CODE], description = jsonParsed[DESCRIPTION] } = response,
    known = statusKnown[statusText]?.[code] ?? '';

  if (debug) {
    dirObject('Analyze', { CODE, DESCRIPTION, OK, code, description, known, status });
  }

  const isKnown = Boolean(known),
    /**
     * @todo New status saving in `status.json`.
     */
    isSaved =
      known === description ||
      (known instanceof Array && known.some((desc) => desc === description)),
    isSuccessful = code === OK && (status === STATUS.CREATED || status === STATUS.OK);

  return {
    isKnown,
    isSaved,
    isSuccessful,
  };
};

export default responseAnalyze;

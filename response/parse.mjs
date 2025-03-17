/**
 * Parse an API response.
 *
 * @typedef {import("#lib/constants.mjs").httpStatusCode} httpStatusCode
 * @typedef {import("#lib/constants.mjs").httpStatusText} httpStatusText
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#types/api.ts").preferences} preferences
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef RParse
 * @prop {dictionary} jsonParsed Parsed JSON data from a response.
 * @typedef ResponseStatus
 * @prop {httpStatusCode} status HTTP status code.
 * @prop {httpStatusText | string} statusText HTTP status text.
 * @typedef {ResponseStatus & RParse} ResponseParse
 * @typedef RParseStatus
 * @prop {number} code Response code.
 * @prop {string} description Response description.
 * @module response/parse
 */

/**
 * Parse a response.
 * @param {RFetch} response Response of a request.
 * @param {string} endpoint Endpoint name.
 * @param {{}} data Request parameters data.
 * @param {(json: {}, endpoint: string, data: {}) => RParse} callback Utility callback function to parse response data.
 * @param {preferences} prefs API specific preferences.
 * @returns {ResponseParse} Parsed response.
 */
const responseParse = (response, endpoint, data, callback, prefs) => {
  const { json, status, statusText } = response,
    isEnabled = prefs.enabled.includes('parse'),
    isParse = prefs.parse.includes(endpoint),
    { parse } = prefs;

  if (typeof parse === 'boolean') {
    if (parse) {
      const { jsonParsed } = callback(json, endpoint, data);

      return { jsonParsed, status, statusText };
    }
  } else {
    if (isEnabled) {
      if (isParse) {
        const { jsonParsed } = callback(json, endpoint, data);

        return { jsonParsed, status, statusText };
      } else console.info(`Parse: endpoint "${endpoint}" is not enabled in preferences.`);
    } else console.info(`Parse: not enabled in preferences.`);
  }

  return { jsonParsed: null, status, statusText };
};

export default responseParse;

/**
 * Parse an API response.
 *
 * @typedef {import("#lib/constants.mjs").HttpStatusCode} HttpStatusCode
 * @typedef {import("#lib/constants.mjs").HttpStatusText} HttpStatusText
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#types/api.d.ts").Preferences} Preferences
 * @typedef {import("#types/response/bybit.d.js").default} Response
 * @typedef RParse
 * @prop {{}} jsonParsed Parsed JSON data from a response.
 * @typedef ResponseStatus
 * @prop {HttpStatusCode} status HTTP status code.
 * @prop {HttpStatusText} statusText HTTP status text.
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
 * @param {Preferences} prefs API specific preferences.
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
      } else console.info(`Parse: endpoint "${endpoint}" is not enabled is settings.`);
    } else console.info(`Parse: not enabled is settings.`);
  }

  return { jsonParsed: null, status, statusText };
};

export default responseParse;

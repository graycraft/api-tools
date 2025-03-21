/**!
 * Constants library for common usage.
 *
 * @typedef {keyof AUTH["SECURITY"]} authSecurity
 * @typedef {keyof HTTP["METHOD"]} httpMethod
 * @typedef {keyof HTTP["STATUS"]} httpStatusText
 * @typedef {HTTP["STATUS"][httpStatusText]} httpStatusCode
 * @module library/constants
 */

const SECOND = /** @type {1_000} */ (1000),
  MINUTE = /** @type {60_000} */ (60 * SECOND),
  HOUR = /** @type {3_600_000} */ (60 * MINUTE),
  DAY = /** @type {86_400_000} */ (24 * HOUR);

const UINT32_MAX = /** @type {4_294_967_296} */ (2 ** 32),
  UINT32_MAX_SAFE = /** @type {4_294_967_295} */ (UINT32_MAX - 1),
  UINT32_MIN_SAFE = /** @type {0} */ (0);

/**
 * @type {{
 *   ALGORITHM: {
 *     ES256: "ES256";
 *     SHA256: "sha256";
 *   },
 *   SECURITY: {
 *     HMAC: "HMAC";
 *     JWT: "JWT";
 *     RSA: "RSA";
 *   },
 * }}
 */
export const AUTH = {
  ALGORITHM: {
    ES256: 'ES256',
    SHA256: 'sha256',
  },
  SECURITY: {
    HMAC: 'HMAC',
    JWT: 'JWT',
    RSA: 'RSA',
  },
};

/**
 * @type {{
 *   METHOD: {
 *     GET: "GET";
 *     POST: "POST";
 *   },
 *   PROTOCOL: "https://";
 *   STATUS: {
 *     BAD_REQUEST: 400;
 *     CREATED: 201;
 *     FORBIDDEN: 403;
 *     INTERNAL_SERVER_ERROR: 500;
 *     NO_CONTENT: 204;
 *     NOT_FOUND: 404;
 *     NOT_IMPLEMENTED: 501;
 *     OK: 200;
 *     PAYMENT_REQUIRED: 402;
 *     SERVICE_UNAVAILABLE: 503;
 *     TOO_MANY_REQUESTS: 429;
 *     UNAUTHORIZED: 401;
 *   };
 * }}
 */
export const HTTP = {
  METHOD: {
    GET: 'GET',
    POST: 'POST',
  },
  PROTOCOL: 'https://',
  STATUS: {
    BAD_REQUEST: 400,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    NOT_IMPLEMENTED: 501,
    OK: 200,
    PAYMENT_REQUIRED: 402,
    SERVICE_UNAVAILABLE: 503,
    TOO_MANY_REQUESTS: 429,
    UNAUTHORIZED: 401,
  },
};

export const NUMBER = {
  DATE: {
    DAY,
    HOUR,
    MINUTE,
    SECOND,
  },
  UINT32_MAX_SAFE,
  UINT32_MIN_SAFE,
};

export const REGEXP = {
  BTC_ADDRESS: /^(bc1|[13])[\dA-HJ-NP-Za-z]{25,59}$/,
  DATE_ISO:
    /^(19[7-9]\d|20[0-2]\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01][0-9]|2[0-3]):([0-5]\d):([0-5]\d)Z$/,
  DATE_ISO_MS:
    /^(19[7-9]\d|20[0-2]\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01][0-9]|2[0-3]):([0-5]\d):([0-5]\d).\d{3}Z$/,
  EVM_ADDRESS: /^0x[\dA-Fa-f]{40}$/,
  /** @todo Add regular expression for transaction identifiers of other currencies. */
  EVM_TXID: /^0x[\dA-Fa-f]{64}$/,
  FLOAT64: /^\d{0,21}.\d{1,21}$/,
  INTEGER: /^\d{1,21}$/,
  SOL_ADDRESS: /^[\dA-Za-z]{44}$/,
  /** @see https://tools.ietf.org/html/rfc3986#appendix-B */
  URI: /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
  UUID: /^[\dA-Fa-f]{8}\-([\dA-Fa-f]{4}\-){3}[\dA-Fa-f]{12}$/,
};

export default {
  AUTH,
  HTTP,
  NUMBER,
  REGEXP,
};

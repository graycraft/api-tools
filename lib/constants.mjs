/**!
 * Constants library for common usage.
 *
 * @module lib/constants
 */

const SECOND = /** @type {1_000} */ 1000,
  MINUTE = /** @type {60_000} */ (60 * SECOND),
  HOUR = /** @type {3_600_000} */ (60 * MINUTE),
  DAY = /** @type {86_400_000} */ (24 * HOUR);

const UINT32_MAX = /** @type {4_294_967_296} */ (2 ** 32),
  UINT32_MAX_SAFE = /** @type {4_294_967_295} */ (UINT32_MAX - 1),
  UINT32_MIN_SAFE = /** @type {0} */ (0);

/**
 * @type {{
 *   SECURITY: {
 *     HMAC: 'HMAC',
 *     JWT: 'JWT',
 *     RSA: 'RSA',
 *   },
 * }}
 */
export const AUTH = {
  SECURITY: {
    HMAC: 'HMAC',
    JWT: 'JWT',
    RSA: 'RSA',
  },
};

/**
 * @type {{
 *   METHOD: {
 *     GET: 'GET',
 *     POST: 'POST',
 *   },
 *   STATUS: {
 *     BAD_REQUEST: 400,
 *     CREATED: 201,
 *     FORBIDDEN: 403,
 *     INTERNAL_SERVER_ERROR: 500,
 *     NO_CONTENT: 204,
 *     NOT_FOUND: 404,
 *     OK: 200,
 *     PAYMENT_REQUIRED: 402,
 *     SERVICE_UNAVAILABLE: 503,
 *     TOO_MANY_REQUESTS: 429,
 *     UNAUTHORIZED: 401,
 *   },
 * }}
 */
export const HTTP = {
  METHOD: {
    GET: 'GET',
    POST: 'POST',
  },
  STATUS: {
    BAD_REQUEST: 400,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
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
  /** @todo Add regular expression for other currencies transaction identifiers. */
  EVM_TXID: /^0x[\dA-Fa-f]{64}$/,
  INTEGER: /^\d{1,21}$/,
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

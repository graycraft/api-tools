/**!
 * Constants library for common usage.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/error-response
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/status-codes
 * @module lib/constants
 */

const SECOND = 1000;

const MINUTE = /** @type {60_000} */ (60 * SECOND);
const HOUR = /** @type {3_600_000} */ (60 * MINUTE);
const DAY = /** @type {86_400_000} */ (24 * HOUR);

/**
 * @type {{
 *   METHOD: {
 *     GET: "GET",
 *     POST: "POST",
 *   },
 *   STATUS: {
 *     [key in string]: number
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

/**
 * @type {{ [key in string]: number }}
 */
export const NUMBER = {
  DAY,
  HOUR,
  MINUTE,
  SECOND,
};

/**
 * @type {{ [key in string]: RegExp }}
 */
export const REGEXP = {
  INTEGER: /^\d+$/,
  TRANSACTION_IDENTIFIER: /^0x[0-9A-f]{64}$/,
  UUID: /^[A-f\d]{4}(?:[A-f\d]{4}-){4}[A-f\d]{12}$/,
};

export default {
  HTTP,
  NUMBER,
  REGEXP,
};

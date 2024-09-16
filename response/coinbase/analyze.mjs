/**
 * Analyze a Coinbase Advanced API response by testing and comparing its properties.
 * 
 * @module response/coinbase/analyze
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/error-response
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/status-codes
 * Success Messages
        200 OK Successful request
        201 Created New object saved
        204 No content Object deleted
    Client Errors
        400 Bad Request Returns JSON with the error message
        401 Unauthorized Couldn't authenticate your request
        402 2FA Token required Re-try request with user’s 2FA token as CB-2FA-Token header
        403 Invalid scope User hasn't authorized necessary scope
        404 Not Found No such object
        429 Too Many Requests Your connection is being rate limited
    Server Errors
        500 Internal Server Error Something went wrong
        503 Service Unavailable Your connection is being throttled or the service is down for maintenance
    'Bad Request': {
      error: 'INVALID_ARGUMENT',
      error_details: 'client_order_id argument is invalid ',
      message: 'client_order_id argument is invalid '
    }
 */

import statusExchange from "./status.json" with { type: "json" };

/**
 * 400: {
    "error": "INVALID_ARGUMENT",
    "error_details": "Invalid product_id",
    "message": "Invalid product_id"
  }
 * '403': {
    error: 'PERMISSION_DENIED',
    error_details: 'User does not have access to portfolio',
    message: 'User does not have access to portfolio'
  }
 */
const HTTP_OK = 200;
//const HTTP_FORBIDDEN = 403;
const responseAnalyze = (response, statusHttp) => {
    const code = response.error ?? "OK",
      message = response.message ?? "OK",
      description = statusExchange[code],
      isCodeDescribed = description === message || (
        Boolean(description?.some) && description.some(desc => desc === message)
      ),
      isCodeKnown = Boolean(statusExchange[code]),
      isResponseSuccessful = code === "OK" && statusHttp === HTTP_OK,
      report = {
        isCodeDescribed,
        isCodeKnown,
        isResponseSuccessful
      };

    return report
  };

export default responseAnalyze;

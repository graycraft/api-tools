/**
 * Analyze a Coinbase Advanced API response by testing and comparing its properties.
 * 
 * @module response/coinbase/analyze
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
        Boolean(description.some) && description.some(desc => desc === message)
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

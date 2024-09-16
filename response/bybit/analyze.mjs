/**
 * Analyze a Bybit API response by testing and comparing its properties.
 * 
 * @module response/bybit/analyze
 */

import statusExchange from "./status.json" with { type: "json" };

const HTTP_OK = 200;
const responseAnalyze = (response, statusHttp) => {
    const code = response.retCode,
      message = response.retMsg,   
      description = statusExchange[code] ?? "",
      isCodeDescribed = description === message || (
        Boolean(description.some) && description.some(desc => desc === message)
      ),
      isCodeKnown = Boolean(statusExchange[code]),
      isResponseSuccessful = code === 0 && statusHttp === HTTP_OK,
      report = {
        isCodeDescribed,
        isCodeKnown,
        isResponseSuccessful
      };

    return report
  };

export default responseAnalyze;

/**
 * Analyze a Coinbase Advanced API response by comparing its code and description.
 *
 * @module response/coinbase/analyze
 */

import statusExchange from './status.json' with { type: 'json' };
import { HTTP } from '../../lib/constants.mjs';

const responseAnalyze = (response, statusHttp) => {
  const { STATUS } = HTTP,
    code = response.error ?? 'OK',
    message = response.message ?? 'OK',
    description = statusExchange[code],
    isCodeDescribed =
      description === message ||
      (Boolean(description.some) && description.some((desc) => desc === message)),
    isCodeKnown = Boolean(statusExchange[code]),
    isSuccessful = code === 'OK' && statusHttp === STATUS.OK,
    report = {
      isCodeDescribed,
      isCodeKnown,
      isSuccessful,
    };

  return report;
};

export default responseAnalyze;

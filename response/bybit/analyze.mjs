/**
 * Analyze a Bybit API response by comparing its code and description.
 *
 * @module response/bybit/analyze
 */

import statusExchange from './status.json' with { type: 'json' };
import { HTTP } from '../../lib/constants.mjs';

const responseAnalyze = (response) => {
  const { STATUS } = HTTP,
    { json, status } = response,
    code = json.retCode,
    message = json.retMsg,
    description = statusExchange[code] ?? '',
    isCodeDescribed =
      description === message ||
      (Boolean(description.some) && description.some((desc) => desc === message)),
    isCodeKnown = Boolean(statusExchange[code]),
    isSuccessful = code === 0 && status === STATUS.OK,
    report = {
      isCodeDescribed,
      isCodeKnown,
      isSuccessful,
    };

  return report;
};

export default responseAnalyze;

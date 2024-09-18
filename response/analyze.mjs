/**
 * Analyze an API response by comparing its code and description with known values.
 *
 * @module response/analyze
 */

import status from './bybit/status.json' with { type: 'json' };
import { HTTP } from '../lib/constants.mjs';

const responseAnalyze = (response, ok) => {
  const { STATUS } = HTTP,
    { json, statusText } = response,
    code = json.retCode ?? ok,
    message = json.retMsg ?? ok,
    description = status[statusText][code] ?? '',
    isCodeKnown =
      description === message ||
      (description instanceof Array && description.some((desc) => desc === message)),
    isCodeDescribed = Boolean(description),
    isSuccessful = code === ok && response.status === STATUS.OK,
    report = {
      isCodeDescribed,
      isCodeKnown,
      isSuccessful,
    };

  return report;
};

export default responseAnalyze;

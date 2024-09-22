/**
 * Analyze an API response by comparing its code and description with known values.
 *
 * @module response/analyze
 */

import { HTTP } from '../lib/constants.mjs';

const responseAnalyze = (response) => {
  const { STATUS } = HTTP,
    { config, status } = global.apiTools,
    {
      RESPONSE: { CODE, DESCRIPTION, OK, SUCCESS },
    } = config,
    { json, statusText } = response;

  const code = json[CODE] ?? OK,
    message = json[DESCRIPTION] ?? SUCCESS,
    description = status[statusText]?.[code] ?? '',
    isCodeKnown =
      description === message ||
      (description instanceof Array && description.some((desc) => desc === message)),
    isCodeDescribed = Boolean(description),
    isSuccessful =
      code === OK && (response.status === STATUS.CREATED || response.status === STATUS.OK),
    report = {
      isCodeDescribed,
      isCodeKnown,
      isSuccessful,
    };

  return report;
};

export default responseAnalyze;

/**
 * Analyze a Coinbase Advanced API response by comparing its code and description.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/error-response
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/status-codes
 * @module response/coinbase/analyze
 */

import statuses from './status.json' with { type: 'json' };
import { HTTP } from '../../lib/constants.mjs';

const responseAnalyze = (response, http) => {
  const { STATUS } = HTTP,
    { json, status } = response,
    ok = 'OK',
    code = json.error ?? ok,
    message = json.message ?? ok,
    description = statuses[String(http)][code] ?? '',
    isCodeKnown =
      description === message ||
      (description instanceof Array && description.some((desc) => desc === message)),
    isCodeDescribed = Boolean(description),
    isSuccessful = code === ok && status === STATUS.OK,
    report = {
      isCodeDescribed,
      isCodeKnown,
      isSuccessful,
    };

  return report;
};

export default responseAnalyze;

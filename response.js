/**
 * Do response aggregation from snapshots for specified APIs.
 *
 * @module response
 */

import responseBybit from './response/bybit/index.mjs';
import responseCoinbase from './response/coinbase/index.mjs';

Promise.resolve().then(responseBybit).then(responseCoinbase);

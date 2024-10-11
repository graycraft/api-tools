/**
 * Do requests for specified APIs.
 *
 * @module request
 */

import requestBybit from './request/bybit/index.mjs';
import requestCoinbase from './request/coinbase/index.mjs';

Promise.resolve().then(requestBybit).then(requestCoinbase);

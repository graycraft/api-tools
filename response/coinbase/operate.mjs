/**
 * Handle Coinbase Advanced API response operations.
 *
 * @typedef {import("#res/operate.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/operate
 */

import operate from '#res/operate.mjs';

import aggregate from './aggregate.mjs';

/**
 * Validate against JSON-schema or aggregate response snapshot file and write to the collection directory.
 * @param {string} endpoint Target endpoint name.
 * @param {string} snapshot Response snapshot file name without `.json` extension.
 * @param {{}} schema JSON-schema to validate against.
 * @returns {RSnapshot} File data has been operated.
 */
const coinbaseOperate = (endpoint, snapshot, schema) => {
  const { coinbase } = global.apiTools,
    data = operate(coinbase.name, endpoint, snapshot, schema, aggregate);

  return data;
};

export default coinbaseOperate;

/**
 * Find an item from a Coinbase Advanced API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.d.js").Dict} Dict
 * @typedef {import("#types/response/coinbase.d.js").default} Response
 * @module response/coinbase/parse/find
 */

/**
 * @param {Response} json
 * @param {{
 *   criterion: string | ((item: Dict) => number),
 *   key: string,
 *   list: string,
 * }} options
 * @returns {Response}
 */
const find = (json, { criterion, key, list }) => {
  if (criterion) {
    const items = json[list].find((item) =>
      key ? item[key] === criterion : typeof criterion === 'function' && criterion(item),
    );

    json = {
      ...json,
      [list]: [items, `... ${json[list].length - 1} more items`],
    };

    return json;
  }
};

export default find;

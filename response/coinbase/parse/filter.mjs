/**
 * Filter items from a Coinbase Advanced API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.d.js").Dict} Dict
 * @typedef {import("#types/response/coinbase.d.js").default} Response
 * @module response/coinbase/parse/filter
 */

/**
 * @param {Response} json
 * @param {{
 *   criterion: string | ((item: Dict) => boolean),
 *   key?: string,
 *   list: string,
 * }} options
 * @returns {Response}
 */
const filter = (json, { criterion, key, list }) => {
  if (criterion) {
    const items = json[list].filter((item) =>
      key ? item[key] === criterion : typeof criterion === 'function' && criterion(item),
    );

    json = {
      ...json,
      [list]: [items, `... ${json[list].length - items.length} more items`],
    };

    return json;
  }
};

export default filter;

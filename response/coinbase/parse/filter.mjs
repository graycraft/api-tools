/**
 * Filter items from a Coinbase Advanced API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.ts").Dict} Dict
 * @typedef {import("#types/response/coinbase.js").default} Response
 * @module response/coinbase/parse/filter
 */

/**
 * @param {Response} json
 * @param {{
 *   criterion: string | ((item: Dict) => boolean),
 *   key?: string,
 *   list: string,
 * }} options
 * @returns {Response | null}
 */
const filter = (json, { criterion, key, list }) => {
  if (json instanceof Object && criterion) {
    const items = json[list].filter((item) =>
      key ? item[key] === criterion : typeof criterion === 'function' && criterion(item),
    );

    json = {
      ...json,
      [list]: [items, `... ${json[list].length - items.length} more items`],
    };

    return json;
  }

  return null;
};

export default filter;

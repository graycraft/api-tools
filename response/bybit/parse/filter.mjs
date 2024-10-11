/**
 * Filter items from a Bybit API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.d.js").Dict} Dict
 * @typedef {import("#types/response/bybit.d.js").default} Response
 * @module response/bybit/parse/filter
 */

/**
 * @param {Response} json
 * @param {{
 *   criterion: string | ((item: Dict) => number),
 *   key?: string,
 *   list: string,
 * }} options
 * @returns {Response}
 */
const filter = (json, { criterion, key, list }) => {
  if (criterion) {
    const items = json.result[list].filter((item) =>
      key ? item[key] === criterion : typeof criterion === 'function' && criterion(item),
    );

    json = {
      ...json,
      result: {
        [list]: [items, `... ${json.result[list].length - items.length} more items`],
      },
    };

    return json;
  }
};

export default filter;

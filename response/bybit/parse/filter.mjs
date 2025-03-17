/**
 * Filter items from a Bybit API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {import("#types/response/bybit.js").default} JResponse
 * @module response/bybit/parse/filter
 */

/**
 * @param {JResponse} json
 * @param {{
 *   criterion: string | ((item: dictionary) => number),
 *   key?: string,
 *   list: string,
 * }} options
 * @returns {JResponse | null}
 */
const filter = (json, { criterion, key, list }) => {
  if (json instanceof Object && criterion) {
    const items = json.result[list]?.filter((/** @type {dictionary} */ item) =>
      key ? item[key] === criterion : typeof criterion === 'function' && criterion(item),
    );

    json = {
      ...json,
      result: {
        [list]: [items, `... ${json.result[list]?.length - items?.length} more items`],
      },
    };

    return json;
  }

  return null;
};

export default filter;

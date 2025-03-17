/**
 * Filter items from a Coinbase Advanced API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {import("#types/response/coinbase.js").default} JResponse
 * @module response/coinbase/parse/filter
 */

/**
 * @param {JResponse} json
 * @param {{
 *   criterion: string | ((item: dictionary) => boolean),
 *   key?: string,
 *   list: string,
 * }} options
 * @returns {JResponse | null}
 */
const filter = (json, { criterion, key, list }) => {
  if (json instanceof Object && criterion) {
    const items = json[list].filter((/** @type {dictionary} */ item) =>
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

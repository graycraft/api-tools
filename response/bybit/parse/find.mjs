/**
 * Find an item from a Bybit API response array by strict equality comparison or a criterion function.
 *
 * @typedef {import("#types/common.ts").Dict} Dict
 * @typedef {import("#types/response/bybit.d.js").default} Response
 * @module response/bybit/parse/find
 */

/**
 * @param {Response} json
 * @param {{
 *   criterion: string | ((item: Dict) => number),
 *   key: string,
 *   list: string,
 * }} options
 * @returns {Response | null}
 */
const find = (json, { criterion, key, list }) => {
  if (json instanceof Object && criterion) {
    const items = json.result[list].find((item) =>
      key ? item[key] === criterion : typeof criterion === 'function' && criterion(item),
    );

    json = {
      ...json,
      result: {
        [list]: [items, `... ${json.result[list].length - 1} more items`],
      },
    };

    return json;
  }

  return null;
};

export default find;

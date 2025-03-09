/**
 * Map items from a Bybit API response array by object key.
 *
 * @typedef {import("#types/response/bybit.js").default} Response
 * @module response/bybit/parse/map
 */

/**
 * @param {Response} json
 * @param {{
 *   key: string | string[],
 *   list: string | string[],
 * }} options
 * @returns {Response | null}
 */
const map = (json, { key, list }) => {
  let data, items;

  if (json instanceof Object) {
    if (typeof key === 'string' && typeof list === 'string') {
      items = json.result[list]?.map((item) => ({
        [key]: item[key],
      }));
      data = {
        ...json,
        result: {
          [list]: items,
        },
      };
    } else if (key instanceof Array && list instanceof Array) {
      items = json.result[list[0]].map((item1) => ({
        [key[0]]: item1[key[0]],
        [list[1]]: item1[list[1]].map((item2) => ({
          [key[1]]: item2[key[1]],
        })),
      }));
      data = {
        ...json,
        result: {
          [list[0]]: items,
        },
      };
    }

    return data;
  }

  return null;
};

export default map;

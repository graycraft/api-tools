/**
 * Map items from a Coinbase Advanced API response array by object key.
 *
 * @typedef {import("#types/response/bybit.d.js").default} Response
 * @module response/coinbase/parse/map
 */

/**
 * @param {Response} json
 * @param {{
 *   key: string | string[],
 *   list: string | string[],
 * }} options
 * @returns {Response}
 */
const map = (json, { key, list }) => {
  let data, items;

  if (typeof key === 'string' && typeof list === 'string') {
    items = json[list].map((item) => ({
      [key]: item[key],
    }));
    data = {
      ...json,
      [list]: items,
    };
  } else if (key instanceof Array && typeof list === 'string') {
    items = json[list].map((item) => ({
      [key[0]]: item[key[0]],
      [key[1]]: item[key[1]],
      [key[2]]: item[key[2]],
    }));
    data = {
      ...json,
      [list]: items,
    };
  } else if (typeof key === 'object' && typeof list === 'object') {
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
};

export default map;

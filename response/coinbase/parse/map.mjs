/**
 * Map items from a Coinbase Advanced API response array by object key.
 *
 * @typedef {import("#types/response/coinbase.js").default} JResponse
 * @module response/coinbase/parse/map
 */

/**
 * @typedef {import("#types/common.ts").dictionary<T>} dictionary
 * @template T
 */

/**
 * @param {JResponse} json
 * @param {{
 *   key: string | string[],
 *   list: string | string[],
 * }} options
 * @returns {JResponse | null}
 */
const map = (json, { key, list }) => {
  let data, items;

  if (json instanceof Object) {
    if (typeof key === 'string' && typeof list === 'string') {
      items = json[list].map((/** @type {dictionary<string>} */ item) => ({
        [key]: item[key],
      }));
      data = {
        ...json,
        [list]: items,
      };
    } else if (key instanceof Array && typeof list === 'string') {
      items = json[list].map((/** @type {dictionary<string>} */ item) => ({
        [key[0]]: item[key[0]],
        [key[1]]: item[key[1]],
        [key[2]]: item[key[2]],
      }));
      data = {
        ...json,
        [list]: items,
      };
    } else if (typeof key === 'object' && typeof list === 'object') {
      items = json.result[list[0]].map((/** @type {dictionary<dictionary<string>[]>} */ item1) => ({
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

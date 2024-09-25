/**
 * Find an item from a Coinbase Advanced API response array by strict equality comparison or a criterion function.
 *
 * @module response/coinbase/parse/find
 */

const find = (json, { criterion, key, list }) => {
  if (criterion) {
    const items = json[list].find((item) => (key ? item[key] === criterion : criterion(item)));

    json = {
      ...json,
      [list]: [items, `... ${json[list].length - 1} more items`],
    };

    return json;
  }
};

export default find;

/**
 * Find an item from a Bybit API response array by strict equality comparison or a criterion function.
 * 
 * @module response/bybit/parse/find
 */

const find = (json, {
  criterion,
  key,
  list,
}) => {
  if (criterion) {
    const items = json.result[list].find(item =>
        key ?
          item[key] === criterion :
          criterion(item)
      );

    json = {
      ...json,
      result: {
        [list]: [
          items,
          `... ${json.result[list].length - 1} more items`
        ]
      }
    };

    return json
  };
}

export default find;

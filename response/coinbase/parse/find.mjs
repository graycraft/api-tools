/**
 * Find an item from a Coinbase Advanced API response array by strict equality comparison or a criterion function.
 * 
 * @module response/coinbase/parse/find
 */

const data = "breakdown";

const find = (json, {
  criterion,
  key,
  list,
}) => {
  if (criterion) {
    const items = json[data][list].find(item =>
        key ?
          item[key] === criterion :
          criterion(item)
      );

    json = {
      ...json,
      [data]: {
        ...json[data],
        [list]: [
          items,
          `... ${json[data][list].length - 1} more items`
        ]
      }
    };

    return json
  };
}

export default find;

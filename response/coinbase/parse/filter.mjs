/**
 * Filter items from a Bybit API response array by strict equality comparison or a criterion function.
 * 
 * @module response/bybit/parse/filter
 */

const filter = (json, {
  criterion,
  key,
  list,
}) => {
  if (criterion) {
    const items = json.result[list].filter(item =>
        key ?
          item[key] === criterion :
          criterion(item)
      );

    json = {
      ...json,
      result: {
        [list]: [
          items,
          `... ${json.result[list].length - items.length} more items`
        ]
      }
    };

    return json
  };
}

export default filter;

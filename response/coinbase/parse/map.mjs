/**
 * Map items from a Coinbase Advanced API response array by object key.
 * 
 * @module response/bybit/parse/map
 */

const map = (json, {
  key,
  list,
}) => {
  let data, items;

  if (
    typeof key === "string" &&
    typeof list === "string"
  ) {
    items = json[list].map(item => ({
      [key]: item[key]
    }));
    data = {
      ...json,
      [list]: items
    };
  } else if (
    typeof key === "object" &&
    typeof list === "object"
  ) {
    items = json.result[list[0]].map(
      item1 => ({
        [key[0]]: item1[key[0]],
        [list[1]]: item1[list[1]].map(
          (item2) => ({
            [key[1]]: item2[key[1]]
          })
        )
      })
    );
    data = {
      ...json,
      result: {
        [list[0]]: items
      }
    };
  }
  
  return data
}

export default map;

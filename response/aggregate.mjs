/**
 * Aggregate a response snapshot, usually for extracting arrays of data.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @typedef {import("#types/api.d.js").Api} Api
 * @typedef {{
 *   currencies: (item) => object;
 *   networks: (row) => object[];
 *   sort: (item1: {}, item2: {}) => number;
 * }} Callback
 * @module response/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';

/**
 * Aggregate a response.
 * @param {string} name A specific API name.
 * @param {string} endpoint Endpoint name.
 * @param {{}[]} data An array from JSON response to map and sort.
 * @param {Callback} callback Callbacks for mapping and sorting arrays.
 * @returns {RSnapshot} Aggregated file data to write in the collection directory.
 */
const aggregateJson = (name, endpoint, data, callback) => {
  const dirName = import.meta.dirname,
    fileName = new Date().toISOString() + '.json',
    path = `../collection/${name}/${endpoint.toLowerCase()}`,
    filePath = nodePath.join(dirName, path),
    filePathFull = nodePath.join(filePath, fileName);
  let array, fileData;

  if (endpoint === 'CURRENCY_ALL') {
    const currencies = data.map(callback.currencies);

    array = currencies.sort(callback.sort);
  }
  if (endpoint === 'CURRENCY_NETWORK_ALL') {
    const networks = data.map(callback.networks),
      arrayDupes = networks.reduce((accum, chain) => accum.concat(chain), []),
      arrayUnique = arrayDupes.filter(
        (item1, index, array) => array.findIndex((item2) => item2.chain === item1.chain) === index,
      );

    array = arrayUnique.sort((a, b) => a.chain.localeCompare(b.chain));
  }
  fileData = JSON.stringify(array, null, 2);
  nodeFs.mkdirSync(filePath, { recursive: true });
  nodeFs.writeFileSync(filePathFull, fileData);
  console.info(`Aggregated "${fileName}" to "${path}".`);

  return { fileData, fileName };
};

/**
 * Determine if there is a need to aggregate a response.
 * @param {Api} api A specific API configuration, name, preferences, settings and status.
 * @param {string} endpoint Endpoint name.
 * @param {{}[]} data An array from JSON response to map.
 * @param {Callback} callback Callbacks for mapping and sorting arrays.
 * @returns {RSnapshot} Aggregated file data to write in the collection directory.
 */
const responseAggregate = (api, endpoint, data, callback) => {
  const { options } = global.apiTools,
    { prefs } = api,
    isEnabled = prefs.enabled.includes('aggregate'),
    isAggregate = prefs.aggregate.includes(endpoint),
    { aggregate } = options;

  if (typeof aggregate === 'boolean') {
    if (aggregate) {
      const { fileData, fileName } = aggregateJson(api.name, endpoint, data, callback);

      return { fileData, fileName };
    }
  } else {
    if (isEnabled) {
      if (isAggregate) {
        const { fileData, fileName } = aggregateJson(api.name, endpoint, data, callback);

        return { fileData, fileName };
      } else console.info(`Aggregate: endpoint "${endpoint}" is not enabled is settings.`);
    } else console.info(`Aggregate: not enabled is settings.`);
  }
};

export default responseAggregate;

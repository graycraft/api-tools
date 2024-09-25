/**
 * Aggregate a response snapshot, usually for extracting arrays of data.
 *
 * @module response/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { obtainName } from '#lib/utility.mjs';

/**
 * @param {string} target
 * @param {string} path
 * @param {array} data
 * @param {{ id, key, name }} properties
 */
const responseAggregate = (target, path, data, { id, key, name }) => {
  const { config, settings } = global.apiTools,
    pathName = obtainName(path, config.PATH),
    isEnabled = settings.enabled.includes('aggregate');

  if (isEnabled) {
    if (pathName) {
      const dirName = import.meta.dirname,
        fileName2 = new Date().toISOString() + '.json',
        path2 = `../collection/${target}/${pathName.toLowerCase()}`,
        filePath2 = nodePath.join(dirName, path2),
        filePathFull2 = nodePath.join(filePath2, fileName2);
      let array, fileData2;

      if (pathName === 'CURRENCY_ALL') {
        const currencies = data.map((item) => ({
          [id]: item[id],
          [key]: item[key],
          [name]: item[name],
        }));

        array = currencies.sort((a, b) => a[key].localeCompare(b[key]));
      }
      if (pathName === 'CURRENCY_NETWORK_ALL') {
        const networks = data.map((row) =>
            row.chains.map((item) => ({
              chain: item.chain,
              chainType: item.chainType,
            })),
          ),
          arrayDupes = networks.reduce((accum, chain) => accum.concat(chain)),
          arrayUnique = arrayDupes.filter(
            (item1, index, array) =>
              array.findIndex((item2) => item2.chain === item1.chain) === index,
          );

        array = arrayUnique.sort((a, b) => a.chain.localeCompare(b.chain));
      }
      fileData2 = JSON.stringify(array, null, 2);
      nodeFs.mkdirSync(filePath2, { recursive: true });
      nodeFs.writeFileSync(filePathFull2, fileData2);
      console.info(`Aggregated "${fileName2}" to "${path2}".`);
    } else console.info(`Aggregate: ${pathName} is not enabled is settings.`);
  } else console.info(`Aggregate is not enabled is settings.`);
};

export default responseAggregate;

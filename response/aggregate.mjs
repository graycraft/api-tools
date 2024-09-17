/**
 * Aggregate a response snapshot, usually for extracting arrays of data.
 *
 * @module response/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { obtainName } from '../lib/utility.mjs';

const responseAggregate = (target, path, data, key) => {
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
        const currencies = data.map((item) => item[key]);

        array = currencies.sort((a, b) => a.localeCompare(b));
      }
      if (pathName === 'NETWORK_ALL') {
        const networks = data.map((row) => row.chains.map((chain) => chain.chain)),
          arrayDupes = networks.reduce((accum, chain) => accum.concat(chain)),
          arrayUnique = [...new Set(arrayDupes)];

        array = arrayUnique.sort((a, b) => a.localeCompare(b));
      }
      fileData2 = JSON.stringify(array, null, 2);
      nodeFs.mkdirSync(filePath2, { recursive: true });
      nodeFs.writeFileSync(filePathFull2, fileData2);
      console.info(`Aggregated "${fileName2}" to "${path2}"`);
    } else console.info(`Aggregate: ${pathName} is not enabled is settings.`);
  } else console.info(`Aggregate is not enabled is settings.`);
};

export default responseAggregate;

/**
 * Aggregate a Bybit API response snapshot, usually for extracting arrays of data.
 * 
 * @module response/bybit/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import settings from "../../settings/bybit.json" with { type: "json" };

const responseAggregate = (path, fileName1) => {
  const {
      aggregate,
    } = settings,
    isEnabled = global.apiTools.config.enabled.aggregate,
    pathName = aggregate.find(item => item === path)?.toLowerCase();

  if (isEnabled && pathName) {
    const dirName = import.meta.dirname,
      fileName2 = pathName + ".json",
      filePath1 = nodePath.join(dirName, "../../snapshot/bybit/" + pathName),
      filePath2 = nodePath.join(dirName, "../../collection/bybit/"),
      filePathFull1 = nodePath.join(filePath1, fileName1),
      filePathFull2 = nodePath.join(filePath2, fileName2),
      fileData1 = nodeFs.readFileSync(filePathFull1),
      json = JSON.parse(fileData1);
    let array, fileData2;

    if (pathName === "currency_all") {
      const currencies = json.result.rows.map(row => row.coin);

      array = currencies.sort(
        (a, b) => a.localeCompare(b)
      );
    }
    if (pathName === "network_all") {
      const networks = json.result.rows.map(
          row => row.chains.map(
            (chain) => chain.chain
          )
        ),
        arrayDupes = networks.reduce(
          (accum, chain) => accum.concat(chain)
        ),
        arrayUnique = [...new Set(arrayDupes)];

      array = arrayUnique.sort(
        (a, b) => a.localeCompare(b)
      );
    }
    fileData2 = JSON.stringify(array, null, 2);
    nodeFs.mkdirSync(filePath2, { recursive: true });
    nodeFs.writeFileSync(filePathFull2, fileData2);
    console.info(`Aggregated "${fileName2}" to "${filePath2}"`);
  } else console.info(`Could not aggregate. ${path} is not enabled is settings.`)
}

export default responseAggregate;

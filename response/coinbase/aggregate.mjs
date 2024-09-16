/**
 * Aggregate a Coinbase Advanced API response snapshot, usually for extracting arrays of data.
 * 
 * @module response/coinbase/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { hasDuplicates } from '../../lib/array.mjs';
import settings from "../../settings/coinbase.json" with { type: "json" };

const responseAggregate = (path, fileName1) => {
  const {
      aggregate,
    } = settings,
    isEnabled = global.apiTools.enabled.aggregate,
    pathName = aggregate.find(item => item === path)?.toLowerCase();

  if (isEnabled && pathName) {
    const dirName = import.meta.dirname,
      fileName2 = pathName + ".json",
      filePath1 = nodePath.join(dirName, "../../snapshot/coinbase/" + pathName),
      filePath2 = nodePath.join(dirName, "../../collection/coinbase/"),
      filePathFull1 = nodePath.join(filePath1, fileName1),
      filePathFull2 = nodePath.join(filePath2, fileName2),
      fileData1 = nodeFs.readFileSync(filePathFull1),
      json = JSON.parse(fileData1);
    let array, fileData2;

    if (pathName === "currency_all") {
      const currencies = json.data.map(item => ({
        code: item.code,
        name: item.name
      }));

      if (hasDuplicates(currencies)) console.warn("\"currency_all\" has duplicate values.");
      array = currencies.sort(
        (a, b) => a.code.localeCompare(b.code)
      );
    }
    /* if (pathName === "network_all") {
      const networks = json.data.map(
          item => item.chains.map(
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
    } */
    fileData2 = JSON.stringify(array, null, 2);
    nodeFs.mkdirSync(filePath2, { recursive: true });
    nodeFs.writeFileSync(filePathFull2, fileData2);
    console.info(`Aggregated "${fileName2}" to "${filePath2}"`);
  } else console.info(`Could not aggregate. ${path} is not enabled is settings.`)
}

export default responseAggregate;

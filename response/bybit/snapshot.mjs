/**
 * Map items from a Bybit API response array by object key.
 * 
 * @module response/bybit/snapshot
 * @see https://nodejs.org/api/fs.html#fsmkdirsyncpath-options
 * @see https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options
 * @see https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname
 * @see https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl#62892482
 */

import fs from 'node:fs';
import nodePath from 'node:path';
import config from "../../configuration/bybit.json" with { type: "json" };
import settings from "../../settings/bybit.json" with { type: "json" };
import { obtainName } from "../../lib/utility.mjs";

const responseSnapshot = (json, path) => {
  const {
      PATH
    } = config,
    {
      snapshot,
    } = settings;

  if (global.apiTools.options.isSnapshot) {
    const pathName = snapshot.find(
      item => item === obtainName(path, PATH)
    )?.toLowerCase();

    if (pathName) {
      const dirName = import.meta.dirname,
        fileData = JSON.stringify(json, null, 2),
        fileName = new Date().toISOString() + ".json",
        filePath = nodePath.join(dirName, "./snapshot/" + pathName),
        filePathFull = nodePath.join(filePath, fileName);
  
      fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(filePathFull, fileData);
      console.info(`Snapped "${fileName}" to "${filePath}"`)
    } else console.info(`Could not snapshot. Endpoint with path "${path}" is not enabled is settings.`)
  }
}

export default responseSnapshot;

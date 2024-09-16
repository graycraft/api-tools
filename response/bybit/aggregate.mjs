/**
 * Aggregate a Bybit API response snapshot, usually for extracting arrays of data.
 * 
 * @module response/bybit/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import responseAggregate from "../aggregate.mjs";
import { obtainName } from "../../lib/utility.mjs";

const bybitAggregate = (path, fileName) => {
    const { config } = global.apiTools,
      dirName = import.meta.dirname,
      pathName = obtainName(path, config.PATH),
      filePath = nodePath.join(dirName, `../../snapshot/bybit/${pathName.toLowerCase()}`),
      filePathFull = nodePath.join(filePath, fileName),
      fileData = nodeFs.readFileSync(filePathFull),
      json = JSON.parse(fileData),
      data = json.result.rows,
      key = "coin";

    responseAggregate('bybit', path, data, key)
  };

export default bybitAggregate;

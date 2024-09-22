/**
 * Aggregate a Coinbase Advanced API response snapshot, usually for extracting arrays of data.
 *
 * @module response/coinbase/aggregate
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import responseAggregate from '../aggregate.mjs';
import { obtainName } from '../../lib/utility.mjs';

const coinbaseAggregate = (path, fileName) => {
  const { config } = global.apiTools,
    dirName = import.meta.dirname,
    pathName = obtainName(path, config.PATH),
    filePath = nodePath.join(dirName, `./snapshot/${pathName.toLowerCase()}`),
    filePathFull = nodePath.join(filePath, fileName),
    fileData = nodeFs.readFileSync(filePathFull),
    json = JSON.parse(String(fileData)),
    data = json.data,
    key = 'code';

  responseAggregate('coinbase', path, data, key);
};

export default coinbaseAggregate;

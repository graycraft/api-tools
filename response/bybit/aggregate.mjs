/**
 * Aggregate a Bybit API response snapshot, usually for extracting arrays of data.
 *
 * @module response/bybit/aggregate
 */

import aggregate from '../aggregate.mjs';
import { fileReadJson } from '../../lib/file_system.mjs';
import { obtainName } from '../../lib/utility.mjs';

const bybitAggregate = (path, fileName) => {
  const { config } = global.apiTools,
    pathName = obtainName(path, config.PATH).toLowerCase(),
    json = fileReadJson('response/bybit/snapshot/' + pathName, fileName),
    data = json.OK.data.result.rows,
    key = 'coin';

  aggregate('bybit', path, data, key);
};

export default bybitAggregate;

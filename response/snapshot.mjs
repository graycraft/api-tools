/**
 * Snapshot an API response to a file with current UTC ISO timestamp.
 *
 * @module response/snapshot
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { obtainName } from '../lib/utility.mjs';

const responseSnapshot = (json, path, target) => {
  const { config, options, settings } = global.apiTools,
    { PATH } = config,
    { enabled, snapshot } = settings,
    name = obtainName(path, PATH),
    isSnapshot = enabled.some((item) => item === 'snapshot'),
    isVerbose = enabled.some((item) => item === 'verbose'),
    isSnapshotEndpoint = snapshot.some((item) => item === name);

  if (isSnapshot) {
    if (isSnapshotEndpoint || options.isSnapshot) {
      const dirName = import.meta.dirname,
        fileData = JSON.stringify(json, null, 2),
        fileName = new Date().toISOString() + '.json',
        path2 = `./${target}/snapshot/${name.toLowerCase()}`,
        filePath = nodePath.join(dirName, path2),
        filePathFull = nodePath.join(filePath, fileName);

      nodeFs.mkdirSync(filePath, { recursive: true });
      nodeFs.writeFileSync(filePathFull, fileData);
      console.info(
        `Snapped "${fileName}" to "${path2}"` + (isVerbose || options.isVerbose ? ':' : '.'),
      );

      return { fileData, fileName };
    } else console.info(`Snapshot: endpoint "${name}" is not enabled is settings.`);
  } else console.info(`Snapshot: not enabled is settings.`);
};

export default responseSnapshot;

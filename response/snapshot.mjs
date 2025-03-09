/**
 * Snapshot an API response to a file with current UTC ISO timestamp.
 *
 * @typedef {import("#types/api.ts").default} Api
 * @typedef {import("#types/response/bybit.js").default} Response
 * @typedef {import("#types/response/snapshot.js").default} Snapshot
 * @typedef RSnapshot
 * @prop {{}} fileData Response code.
 * @prop {string} fileName Response description.
 * @module response/snapshot
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';

/**
 * Make snapshot of a response.
 * @param {Api} api A specific API configuration, name, preferences, settings and status.
 * @param {Snapshot} output Information about request and response to output.
 * @param {string} endpoint Endpoint name.
 * @returns {RSnapshot} File data to write in a specific API's snapshot directory.
 */
const responseSnapshot = (api, output, endpoint) => {
  const { options } = global.apiTools,
    { prefs } = api,
    { snapshot } = options,
    isEnabled = prefs.enabled.includes('snapshot'),
    isSnapshot = prefs.snapshot.includes(endpoint);

  if (typeof snapshot === 'boolean') {
    if (snapshot) {
      const { fileData, fileName } = snapshotJson(api, output, endpoint);

      return { fileData, fileName };
    }
  } else {
    if (isEnabled) {
      if (isSnapshot) {
        const { fileData, fileName } = snapshotJson(api, output, endpoint);

        return { fileData, fileName };
      } else console.info(`Snapshot: endpoint "${endpoint}" is not enabled in preferences.`);
    } else console.info(`Snapshot: not enabled in preferences.`);
  }
};

/**
 * Write JSON snapshot data to a file.
 * @param {Api} api A specific API configuration, name, preferences, settings and status.
 * @param {Snapshot} output Information about request and response to output.
 * @param {string} endpoint Endpoint name.
 * @returns {RSnapshot} File data to write in a specific API's snapshot directory.
 */
export const snapshotJson = (api, output, endpoint) => {
  const { options } = global.apiTools,
    { prefs } = api,
    dirName = import.meta.dirname,
    fileData = JSON.stringify(output, null, 2),
    fileName = new Date().toISOString() + '.json',
    path2 = `./${api.name}/snapshot/${endpoint.toLowerCase()}`,
    filePath = nodePath.join(dirName, path2),
    filePathFull = nodePath.join(filePath, fileName),
    isVerbose = prefs.enabled.includes('verbose');

  nodeFs.mkdirSync(filePath, { recursive: true });
  nodeFs.writeFileSync(filePathFull, fileData);
  console.info(`Snapped "${fileName}" to "${path2}"` + (isVerbose || options.verbose ? ':' : '.'));

  return { fileData, fileName };
};

export default responseSnapshot;

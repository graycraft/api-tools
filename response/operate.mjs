/**
 * Operate a response snapshot to aggregate or validate data.
 *
 * @typedef {import("#types/api.ts").name} name
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {import("#types/response/snapshot.js").default} JSnapshot
 * @typedef RSnapshot
 * @prop {dictionary | string} fileData Response code.
 * @prop {string} fileName Response description.
 * @typedef {(directory: string, fileName: string) => RSnapshot} FAggregate
 * @module response/perform
 */

import { successfulJson } from '#lib/fetch.mjs';
import { fileNewest, fileReadJson } from '#lib/file_system.mjs';
import { toPascalCase } from '#lib/string.mjs';
import validate from '#res/validate.mjs';

/**
 * Validate against JSON-schema or aggregate response snapshot file and write to the collection directory.
 * @param {name} apiName A specific API name.
 * @param {string} endpoint Target endpoint name.
 * @param {string} snapshot Response snapshot file name without `.json` extension.
 * @param {{}} schema JSON-schema to validate against.
 * @param {FAggregate} aggregate Utility callback function to process response data.
 * @returns {RSnapshot} File data has been operated.
 */
const responseOperate = (apiName, endpoint, snapshot, schema, aggregate) => {
  const { options } = global.apiTools,
    dir = endpoint.toLowerCase(),
    dirBase = `response/${apiName}/snapshot/`;

  let snapshotData,
    fileName = snapshot + '.json';

  if (options.aggregate) {
    if (global.apiTools[apiName].prefs.aggregate.includes(endpoint)) {
      if (snapshot) {
        snapshotData = aggregate(dir, fileName);
      } else {
        const file = fileNewest(dirBase + dir);

        snapshotData = aggregate(dir, file.name);
      }
    } else
      console.info(
        `Aggregate: endpoint "${endpoint}" of ${toPascalCase(apiName)} API is not enabled in preferences.`,
      );
  } else if (options.validate) {
    if (global.apiTools[apiName].prefs.validate.includes(endpoint)) {
      let fileData;

      if (snapshot) {
        fileData = /** @type {JSnapshot} */ (fileReadJson(dirBase + dir, fileName));
      } else {
        const file = fileNewest(dirBase + dir);

        fileName = file.name;
        fileData = /** @type {JSnapshot} */ (fileReadJson(dirBase + dir, fileName));
      }

      validate(successfulJson(fileData), schema, apiName, fileName);

      snapshotData = {
        fileData,
        fileName,
      };
    } else
      console.info(
        `Validate: endpoint "${endpoint}" of ${toPascalCase(apiName)} API is not enabled in preferences.`,
      );
  } else console.info('Specify operation you want to perform: aggregation or validation.');

  return snapshotData;
};

export default responseOperate;

/**
 * Operate a response snapshot to aggregate or validate data.
 *
 * @typedef {import("#types/api.d.js").Name} Name
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @typedef {(directory: string, fileName: string) => RSnapshot} FAggregate
 * @module response/perform
 */

import { successfulJson } from '#lib/fetch.mjs';
import { fileNewest, fileReadJson } from '#lib/file_system.mjs';
import { toPascalCase } from '#lib/string.mjs';
import validate from '#res/validate.mjs';

/**
 * Validate against JSON-schema or aggregate response snapshot file and write to the collection directory.
 * @param {Name} apiName A specific API name.
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

  let fileData,
    fileName = snapshot + '.json';

  if (options.aggregate) {
    if (global.apiTools[apiName].prefs.aggregate.includes(endpoint)) {
      if (snapshot) {
        console.log(dir, fileName);
        fileData = aggregate(dir, fileName);
      } else {
        const file = fileNewest(dirBase + dir);

        fileName = file.name;
        fileData = aggregate(dir, fileName);
      }
    } else
      console.info(
        `Aggregate: endpoint "${endpoint}" of ${toPascalCase(apiName)} API is not enabled in preferences.`,
      );
  } else if (options.validate) {
    if (global.apiTools[apiName].prefs.validate.includes(endpoint)) {
      if (snapshot) {
        fileData = fileReadJson(dirBase + dir, fileName);
      } else {
        const file = fileNewest(dirBase + dir);

        fileName = file.name;
        fileData = fileReadJson(dirBase + dir, fileName);
      }
      validate(successfulJson(fileData), schema, apiName, fileName);
    } else
      console.info(
        `Validate: endpoint "${endpoint}" of ${toPascalCase(apiName)} API is not enabled in preferences.`,
      );
  } else console.info('Specify operation you want to perform: aggregation or validation.');

  return fileData;
};

export default responseOperate;

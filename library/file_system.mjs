/**!
 * File system related methods, such as for reading and writing files.
 *
 * @typedef {{
 *   name: string;
 *   time: number;
 * }} RFile
 * @module library/file_system
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';

/**
 * Find newest file in a specified directory by its creation timestamp.
 * @param {string} directory Directory to search file in.
 * @returns {RFile} File data.
 */
export const fileNewest = (directory) => {
  const dirName = import.meta.dirname,
    fileDir = nodePath.join(dirName, '../' + directory),
    fileAll = nodeFs
      .readdirSync(fileDir)
      .map((name) => ({
        name,
        time: Number(new Date(name.split('.')[0])),
      }))
      .sort((a, b) => b.time - a.time),
    file = fileAll[0];

  if (!file) throw new Error(fileNewest.name + ': directory is empty.');

  return file;
};

/**
 * Read JSON data from the file in a specified directory.
 * @param {string} directory Directory where file is.
 * @param {string} fileName Name of the file with extension.
 * @returns {object} JSON data.
 */
export const fileReadJson = (directory, fileName) => {
  const dirName = import.meta.dirname,
    fileDir = nodePath.join(dirName, '../' + directory),
    filePath = nodePath.join(fileDir, fileName),
    fileData = nodeFs.readFileSync(filePath),
    json = JSON.parse(String(fileData));

  return json;
};

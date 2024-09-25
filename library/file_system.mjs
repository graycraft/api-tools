/**!
 * File system related methods, such as for reading and writing files.
 *
 * @module lib/file_system
 */

import nodeFs from 'node:fs';
import nodePath from 'node:path';

export const fileNameNewest = (dir) => {
  const dirName = import.meta.dirname,
    fileDir = nodePath.join(dirName, '../' + dir),
    fileAll = nodeFs
      .readdirSync(fileDir)
      .map((name) => ({
        name,
        time: Number(new Date(name.split('.')[0])),
      }))
      .sort((a, b) => b.time - a.time),
    file = fileAll[0];

  if (!file) throw new Error(fileNameNewest.name + ': directory is empty.');

  return file;
};

export const fileReadJson = (path, fileName) => {
  const dirName = import.meta.dirname,
    filePath = nodePath.join(dirName, '../' + path),
    filePathFull = nodePath.join(filePath, fileName),
    fileData = nodeFs.readFileSync(filePathFull),
    json = JSON.parse(String(fileData));

  return json;
};

import * as fs from 'node:fs';
import _ from 'lodash';
const { sortBy, uniq } = _;

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

  const allKeys = [...Object.keys(data1), ...Object.keys(data2)];
  const keys = uniq(sortBy(allKeys));

  const result = keys.reduce((acc, key) => {
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) {
      if (data1[key] !== data2[key]) {
        acc.push(` - ${key}: ${data1[key]}`);
        acc.push(` + ${key}: ${data2[key]}`);
      }
      return acc;
    }
    if (data1.hasOwnProperty(key)) {
      acc.push(` - ${key}: ${data1[key]}`);
      return acc;
    }
    acc.push(` + ${key}: ${data2[key]}`);
    return acc;
  }, [])

  return result.join('\n');
};

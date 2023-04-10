import _ from 'lodash';
import parse from './parsers.js';

const { sortBy, uniq } = _;

export default (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const allKeys = [...Object.keys(data1), ...Object.keys(data2)];
  const keys = uniq(sortBy(allKeys));

  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] !== data2[key]) {
        acc.push(` - ${key}: ${data1[key]}`);
        acc.push(` + ${key}: ${data2[key]}`);
      }
      return acc;
    }
    if (Object.hasOwn(data1, key)) {
      acc.push(` - ${key}: ${data1[key]}`);
      return acc;
    }
    acc.push(` + ${key}: ${data2[key]}`);
    return acc;
  }, []);

  return result.join('\n');
};

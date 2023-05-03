import format from '../src/formatters/index.js';
import differ from '../src/differ.js';
import parse from '../src/parsers.js';

export default (filepath1, filepath2, userFormat = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diff = differ(data1, data2);
  const formatted = format(diff, userFormat);
  console.log(formatted);
};

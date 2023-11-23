import differ from '../src/differ.js';
import parse from '../src/parsers.js';

const parseFile = (filename) => parse(`fixtures/files/${filename}`);
const diff = parse('fixtures/diffs/diff_1&2.json');
const nodiff = parse('fixtures/diffs/diff_1&1.json');

const testCases = [
  ['json and json', 'file1.json', 'file2.json', diff],
  ['yml and yaml', 'file1.yml', 'file2.yaml', diff],
  ['json and yaml', 'file1.json', 'file2.yaml', diff],
  ['yml and json are equal', 'file1.yml', 'file1.json', nodiff],
  ['empty files', 'empty.yaml', 'empty.json', []],
];

test.each(testCases)('%s', (_testName, path1, path2, result) => {
  const data1 = parseFile(path1);
  const data2 = parseFile(path2);
  expect(differ(data1, data2)).toStrictEqual(result);
});

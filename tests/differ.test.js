import differ from '../src/differ.js';
import parse from '../src/parsers.js';

const diff = parse('fixtures/diffs/diff_1&2.json');

test('json and json', () => {
  const path1 = 'fixtures/files/file1.json';
  const path2 = 'fixtures/files/file2.json';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(differ(data1, data2)).toStrictEqual(diff);
});

test('yml and yaml', () => {
  const path1 = 'fixtures/files/file1.yml';
  const path2 = 'fixtures/files/file2.yaml';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(differ(data1, data2)).toStrictEqual(diff);
});

test('json and yaml', () => {
  const path1 = 'fixtures/files/file1.json';
  const path2 = 'fixtures/files/file2.yaml';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(differ(data1, data2)).toStrictEqual(diff);
});

test('yml and json are equal', () => {
  const diff1 = parse('fixtures/diffs/diff_1&1.json');
  const path1 = 'fixtures/files/file1.yml';
  const path2 = 'fixtures/files/file1.json';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(differ(data1, data2)).toStrictEqual(diff1);
});

test('empty files', () => {
  const path1 = 'fixtures/files/empty.yaml';
  const path2 = 'fixtures/files/empty.json';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(differ(data1, data2)).toStrictEqual([]);
});

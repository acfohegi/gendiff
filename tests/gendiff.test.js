import gendiff from '../src/gendiff.js';
import parse from '../src/parsers.js';

const result = [
  ' - follow: false',
  ' - proxy: 123.234.53.22',
  ' - timeout: 50',
  ' + timeout: 20',
  ' + verbose: true',
].join('\n');

test('json', () => {
  const path1 = 'fixtures/file1.json';
  const path2 = 'fixtures/file2.json';
  expect(gendiff(path1, path2)).toBe(result);
});

test('yaml', () => {
  const path1 = 'fixtures/file1.yml';
  const path2 = 'fixtures/file2.yaml';
  expect(gendiff(path1, path2)).toBe(result);
});

test('json and yaml', () => {
  const path1 = 'fixtures/file1.json';
  const path2 = 'fixtures/file2.yaml';
  expect(gendiff(path1, path2)).toBe(result);
});

test('no diff', () => {
  const path1 = 'fixtures/file1.yml';
  const path2 = 'fixtures/file1.json';
  expect(gendiff(path1, path2)).toBe('');
});

test('unknown format', () => {
  const path = 'fixtures/file1.sonj';
  expect(() => parse(path)).toThrow('unknown file format');
});

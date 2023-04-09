import gendiff from '../src/gendiff.js';

const path1 = 'fixtures/file1.json';
const path2 = 'fixtures/file2.json';
const result = [
  ' - follow: false',
  ' - proxy: 123.234.53.22',
  ' - timeout: 50',
  ' + timeout: 20',
  ' + verbose: true',
].join('\n');

test('first', () => {
  expect(gendiff(path1, path2)).toBe(result);
});

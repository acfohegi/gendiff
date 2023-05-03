import parse from '../src/parsers.js';

test('unknown format', () => {
  const path = 'fixtures/files/file1.sonj';
  expect(() => parse(path)).toThrow('unknown file format');
});

test('empty json', () => {
  const path = 'fixtures/files/empty.json';
  expect(parse(path)).toStrictEqual({});
});

test('empty yaml', () => {
  const path = 'fixtures/files/empty.yaml';
  expect(parse(path)).toStrictEqual({});
});

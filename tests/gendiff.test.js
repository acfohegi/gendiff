import * as fs from 'node:fs';
import gendiff from '../src/diff.js';
import format from '../src/formatter.js';
import parse from '../src/parsers.js';

const diff = parse('fixtures/diff_1&2.json');

test('json and json', () => {
  const path1 = 'fixtures/file1.json';
  const path2 = 'fixtures/file2.json';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(gendiff(data1, data2)).toStrictEqual(diff);
});

test('yml and yaml', () => {
  const path1 = 'fixtures/file1.yml';
  const path2 = 'fixtures/file2.yaml';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(gendiff(data1, data2)).toStrictEqual(diff);
});

test('json and yaml', () => {
  const path1 = 'fixtures/file1.json';
  const path2 = 'fixtures/file2.yaml';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(gendiff(data1, data2)).toStrictEqual(diff);
});

test('yml and json have no diff', () => {
  const diff1 = parse('fixtures/diff_1&1.json');
  const path1 = 'fixtures/file1.yml';
  const path2 = 'fixtures/file1.json';
  const data1 = parse(path1);
  const data2 = parse(path2);
  expect(gendiff(data1, data2)).toStrictEqual(diff1);
});

test('unknown format', () => {
  const path = 'fixtures/file1.sonj';
  expect(() => parse(path)).toThrow('unknown file format');
});

test('format', () => {
  const formatted = fs.readFileSync('fixtures/formatted.txt', 'utf-8');
  expect(format(diff)).toBe(formatted);
});

// TODO: test for empty files

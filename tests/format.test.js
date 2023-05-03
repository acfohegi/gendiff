import * as fs from 'node:fs';
import format from '../src/formatters/index.js';
import parse from '../src/parsers.js';

const diff = parse('fixtures/diffs/diff_1&2.json');

test('stylish format', () => {
  const formatted = fs.readFileSync('fixtures/formatted_diffs/stylish_1&2.txt', 'utf-8');
  expect(format(diff, 'stylish')).toBe(formatted);
});

test('plain format', () => {
  const formatted = fs.readFileSync('fixtures/formatted_diffs/plain_1&2.txt', 'utf-8');
  expect(format(diff, 'plain')).toBe(formatted);
});

test('unknown format', () => {
  expect(() => format(diff, 'plylish')).toThrow('unknown format');
});

test('no format', () => {
  expect(() => format(diff, null)).toThrow('no format');
  expect(() => format(diff, undefined)).toThrow('no format');
});

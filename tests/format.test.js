import { readFileSync } from 'node:fs';
import format from '../src/formatters/index.js';
import parse from '../src/parsers.js';

const diff = parse('fixtures/diffs/diff_1&2.json');
const readFormatted = (filename) => readFileSync(`fixtures/formatted_diffs/${filename}`, 'utf-8');

const testCases = [
  ['stylish', 'stylish_1&2.txt'],
  ['plain', 'plain_1&2.txt'],
  ['json', 'json_1&2.txt'],
];

test.each(testCases)('%s format', (formatName, fixture) => {
  const formatted = readFormatted(fixture);
  expect(format(diff, formatName)).toBe(formatted);
});

test('unknown format', () => {
  expect(() => format(diff, 'plylish')).toThrow('unknown format');
});

test('no format', () => {
  expect(() => format(diff, null)).toThrow('no format');
  expect(() => format(diff, undefined)).toThrow('no format');
});

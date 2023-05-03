#!/usr/bin/env node
import { Command } from 'commander';
import format from '../src/formatters/index.js';
import gendiff from '../src/diff.js';
import parse from '../src/parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const diff = gendiff(data1, data2);
    const formatted = format(diff, program.opts().format);
    console.log(formatted);
  });

program.parse();

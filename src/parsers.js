import * as fs from 'node:fs';
import * as path from 'node:path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const ext = path.extname(filepath);
  const data = fs.readFileSync(filepath, 'utf-8');
  if (!data) {
    return {};
  }
  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }
  throw new Error('unknown file format');
};

export default parse;

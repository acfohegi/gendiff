import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case (null):
      throw Error('no format');
    case (undefined):
      throw Error('no format');
    default:
      throw Error('unknown format');
  }
};

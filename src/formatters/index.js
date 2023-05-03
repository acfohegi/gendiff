import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case (null):
      throw Error('no format');
    case (undefined):
      throw Error('no format');
    default:
      throw Error('unknown format');
  }
};

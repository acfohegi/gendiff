import _ from 'lodash';

const { isObject, isString } = _;

const getValue = (obj, key = 'value') => {
  if (isObject(obj[key])) {
    return '[complex value]';
  }
  if (isString(obj[key])) {
    return `'${obj[key]}'`;
  }
  return obj[key];
};

const getStatus = (obj) => {
  switch (obj.status) {
    case 'added':
      return `was added with value: ${getValue(obj)}`;
    case 'deleted':
      return 'was removed';
    case 'changed':
      return `was updated. From ${getValue(obj, 'oldValue')} to ${getValue(obj)}`;
    default:
      return null;
  }
};

const getPropertyName = (keys) => {
  const name = keys.join('.');
  return `'${name}'`;
};

const hasChildren = (node) => {
  if (Object.hasOwn(node, 'children')) {
    return true;
  }
  return false;
};

export default (diff) => {
  const result = [];

  const format = (objects, keys) => {
    objects.forEach((obj) => {
      if (hasChildren(obj)) {
        const newKeys = [...keys, obj.key];
        format(obj.children, newKeys);
        return;
      }
      const status = getStatus(obj);
      if (!status) {
        return;
      }
      const propName = getPropertyName([...keys, obj.key]);

      const line = `Property ${propName} ${status}`;
      result.push(line);
    });
  };

  format(diff, []);
  return result.join('\n');
};

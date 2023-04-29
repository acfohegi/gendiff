import _ from 'lodash';

const { isObject, sortBy, uniq } = _;

const getKeys = (obj1, obj2) => {
  const allKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  return uniq(sortBy(allKeys));
};

const childrenDiff = (obj1, obj2, cb) => {
  const keys = getKeys(obj1, obj2);
  return keys.map((k) => cb(obj1, obj2, k));
};

export default (data1, data2) => {
  const diff = (obj1, obj2, key) => {
    if (!key) {
      return childrenDiff(data1, data2, diff);
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, children: childrenDiff(obj1[key], obj2[key], diff) };
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return { status: 'equal', key, value: obj1[key] };
      }
      return {
        status: 'changed', key, oldValue: obj1[key], value: obj2[key],
      };
    }
    if (Object.hasOwn(obj1, key)) {
      return { status: 'deleted', key, value: obj1[key] };
    }
    return { status: 'added', key, value: obj2[key] };
  };

  return diff(data1, data2, null);
};

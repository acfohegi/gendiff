import _ from 'lodash';

const { isObject } = _;
const space = '  ';
const addedSym = '+ ';
const delSym = '- ';

const hasChildren = (node) => {
  if (Object.hasOwn(node, 'children')) {
    return true;
  }
  return false;
};

const getMargin = (times) => space.repeat(times);

const getPrefix = (node) => {
  switch (node.status) {
    case 'equal':
      return space;
    case 'deleted':
      return delSym;
    case 'added':
      return addedSym;
    case 'changed':
      return addedSym;
    default:
      return space;
  }
};

const getValue = (value, lvl) => {
  const stringify = (obj, newLvl) => {
    const margin = getMargin(newLvl);
    const prefix = space;
    const closingBracket = `${getMargin(newLvl - 1)}}`;

    const keys = Object.keys(obj);
    const result = [];
    result.push('{\n');
    const lines = keys.map((k) => {
      const v = getValue(obj[k], lvl + 2);
      const line = `${margin}${prefix}${k}: ${v}\n`;
      return line;
    });
    result.push(...lines);
    result.push(closingBracket);
    return result.join('');
  };

  const result = !isObject(value) ? value : stringify(value, lvl + 2);
  return result;
};

export default (diff) => {
  const result = ['{\n'];

  const format = (node, lvl) => {
    const k = node.key;

    if (hasChildren(node)) {
      result.push(`${getMargin(lvl + 1)}${k}: {\n`);
      const childrenStrings = node.children.map((child) => format(child, lvl + 2));
      result.push(...childrenStrings);
      result.push(`${getMargin(lvl + 1)}}\n`);
      return;
    }

    const margin = getMargin(lvl);
    const prefix = getPrefix(node);
    const v = getValue(node.value, lvl);
    const keyValue = `${k}: ${v}`;

    if (node.status === 'changed') {
      const oldV = getValue(node.oldValue, lvl);
      const keyOldValue = `${k}: ${oldV}`;
      result.push(`${margin}${delSym}${keyOldValue}\n`);
    }
    result.push(`${margin}${prefix}${keyValue}\n`);
  };

  diff.map((node) => format(node, 1));
  result.push('}');
  return result.join('');
};

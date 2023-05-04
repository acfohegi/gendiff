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

const getKey = (node) => node.key;

const getValue = (value, lvl) => {
  const stringify = (obj, newLvl) => {
    const margin = getMargin(newLvl);
    const prefix = space;
    const openingBracket = ('{\n');
    const closingBracket = `${getMargin(newLvl - 1)}}`;

    const keys = Object.keys(obj);
    const lines = keys.map((k) => {
      const v = getValue(obj[k], lvl + 2);
      const line = `${margin}${prefix}${k}: ${v}\n`;
      return line;
    });

    return [openingBracket, ...lines, closingBracket].join('');
  };

  const result = !isObject(value) ? value : stringify(value, lvl + 2);
  return result;
};

const getLines = (node, lvl) => {
  const margin = getMargin(lvl);
  const prefix = getPrefix(node);
  const k = getKey(node);
  const v = getValue(node.value, lvl);
  const keyValue = `${k}: ${v}`;

  const line = [margin, prefix, keyValue, '\n'].join('');

  if (node.status === 'changed') {
    const oldV = getValue(node.oldValue, lvl);
    const keyOldValue = `${k}: ${oldV}`;
    const delLine = [margin, delSym, keyOldValue, '\n'].join('');
    return [delLine, line];
  }
  return [line];
};

export default (diff) => {
  const format = (node, lvl, allLines = []) => {
    if (hasChildren(node)) {
      const openingBracket = `${getMargin(lvl + 1)}${getKey(node)}: {\n`;
      const childrenStrings = node.children.flatMap((child) => format(child, lvl + 2));
      const closingBracket = `${getMargin(lvl + 1)}}\n`;
      return [openingBracket, ...childrenStrings, closingBracket].join('');
    }
    const lines = getLines(node, lvl);
    return [...allLines, ...lines];
  };

  const formatted = diff.flatMap((obj) => format(obj, 1));
  const result = ['{\n', ...formatted, '}'];
  return result.join('');
};

const cloneWithUpdate = (obj, path, value, idx = 0) => {
  if (idx >= path.length) {
    return value;
  }
  const key = path[idx];
  const clone = Array.isArray(obj) ? obj.slice() : {...obj};
  clone[key] = cloneWithUpdate(obj[key], path, value, idx + 1);
  return clone;
};

const keyStartsWith = (obj, prefix) => Object.keys(obj).find(k => k.startsWith(prefix));
const reactFiber = (el) => el[keyStartsWith(el, '__reactInternalInstance')];
const classList = classes => classes.map(c => `.${c}`).join(',');
const indexBy = (iter, func) => Object.fromEntries(Array.from(iter).map(i => [func(i), i]));

// hehehe
Object.prototype.tap = function(f) { f(this); return this; }
const element = (name, init) => document.createElement(name).tap(init);

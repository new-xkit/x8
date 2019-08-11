export const cloneWithUpdate = (obj, path, value, idx = 0) => {
  if (idx >= path.length) {
    return value;
  }
  const key = path[idx];
  const clone = Array.isArray(obj) ? obj.slice() : {...obj};
  clone[key] = cloneWithUpdate(obj[key], path, value, idx + 1);
  return clone;
};

export const keyStartsWith = (obj, prefix) => Object.keys(obj).find(k => k.startsWith(prefix));
export const reactFiber = el => el[keyStartsWith(el, '__reactInternalInstance')];
export const classList = classes => classes.map(c => `.${c}`).join(',');
export const indexBy = (iter, func) => Object.fromEntries(Array.from(iter).map(i => [func(i), i]));

// hehehe
Object.prototype.tap = function(f) { f(this); return this; };
export const element = (name, init) => document.createElement(name).tap(init);
export const reactLoaded = new Promise((resolve, reject) => {
  let tries = 0;
  const check = () => {
    if (document.querySelector('#root')._reactRootContainer) {
      resolve();
    }
    if (tries++ > 50) {
      reject();
    }
    setTimeout(check, 100);
  };
  check();
});

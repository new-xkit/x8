// With acknowledgments to zoe bootsy.
// Copyright 2019, licensed under the GPL v3.0 or later.

let webcrack3;
const webcrack3_injection = (_module, _exports, require) => {
  webcrack3 = {
    require,
    moduleFunctions: require.m,
    findModuleFunctionWithSourceLike(string_or_regex) {
      const predicate = typeof string_or_regex === 'string' ?
        s => s.indexOf(string_or_regex) !== -1 :
        string_or_regex.test.bind(string_or_regex);

      return Object.entries(this.moduleFunctions).
        filter((_name, func) => predicate(func.toString()));
    },
    loadedModules: require.c,
    findExportedName(key) {
      return Object.values(this.loadedModules).
        filter(m => m.exports && m.exports[key]).
        map(m => m.exports[key]);
    },
  };
};

(window.webpackJsonp = window.webpackJsonp || []).push([
  [1337], {webcrack3_injection}, [['webcrack3_injection']],
]);

export default webcrack3;

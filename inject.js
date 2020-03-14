const {getURL} = browser.runtime;
const redpop = [...document.scripts].filter(i => i.src.match('/pop/')).length;

if (redpop) {
  browser.storage.local.get('enabledScripts').then(({enabledScripts}) => {
    enabledScripts = enabledScripts || [];

    enabledScripts.forEach(name => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = getURL(`src/${name}.js`);

      document.documentElement.appendChild(script);
      script.parentNode.removeChild(script);
    });
  });
}

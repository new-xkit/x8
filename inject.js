const {getURL} = browser.runtime;
const redpop = [...document.scripts].filter(i => i.src.match('/pop/')).length;

if (redpop) {
  const installedScripts = ['reblog_timestamps', 'all_features'];
  installedScripts.forEach(name => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = getURL(`src/${name}.js`);
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
  });
}

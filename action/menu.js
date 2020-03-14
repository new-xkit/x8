const installedScripts = [
  {name: 'reblog_timestamps', title: 'Reblog Timestamps'},
  {name: 'all_features', title: 'All Features'},
];

const scriptsList = document.querySelector('#scripts ul');
const writeEnabled = () => {
  const enabledScripts = installedScripts.map(
    script => document.getElementById(script.name).checked ? script.name : undefined,
  ).filter(x => x !== undefined);

  browser.storage.local.set({
    enabledScripts,
  }).catch(console.error);
};

browser.storage.local.get('enabledScripts').then(({enabledScripts}) => {
  enabledScripts = enabledScripts || [];

  installedScripts.forEach(script => {
    const listItem = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');
    listItem.appendChild(input);
    listItem.appendChild(label);

    input.id = script.name;
    input.setAttribute('type', 'checkbox');
    input.checked = enabledScripts.includes(script.name);
    input.oninput = writeEnabled;

    label.setAttribute('for', script.name);
    label.innerText = script.title;

    scriptsList.appendChild(listItem);
  });
});

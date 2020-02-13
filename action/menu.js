const installedScripts = [
  {name: 'reblog_timestamps', title: 'Reblog Timestamps'},
  {name: 'all_features', title: 'All Features'},
];

const scriptsList = document.querySelector('#scripts ul');
const writeEnabled = () => {
  const enabledScripts = [];

  for (const listItem of scriptsList.children) {
    const input = listItem.getElementsByTagName('input')[0];
    if (input.checked === true) {
      enabledScripts.push(input.id);
    }
  }

  browser.storage.local.set(
    {enabledScripts},
  ).catch(console.error);
};

installedScripts.forEach(script => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <input type="checkbox" id="${script.name}">
    <label for="${script.name}">${script.title}</label>
  `;

  scriptsList.appendChild(listItem);
  document.getElementById(script.name).oninput = writeEnabled;
});

browser.storage.local.get('enabledScripts').then(({enabledScripts}) => {
  enabledScripts.forEach(scriptName => document.getElementById(scriptName).checked = true);
});

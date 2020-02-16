browser.storage.local.get('initialized').then(({initialized}) => {
  if (!initialized) {
    browser.storage.local.set({'enabledScripts': [
      'reblog_timestamps',
      'all_features',
    ]}).then(browser.storage.local.set({'initialized': true}));
  }
});

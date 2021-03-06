'use strict';
(function () {
  const browser = require('webextension-polyfill');

  // Saves options to browser.storage
  function saveOptions () {
    const githubEnabled = document.getElementById('githubEnabled').checked;
    const githubTemplateUrl = document.getElementById('githubTemplateUrl').value;
    const githubTemplateContent = document.getElementById('githubTemplateContent').value;
    const bitbucketEnabled = document.getElementById('bitbucketEnabled').checked;
    const bitbucketTemplateContent = document.getElementById('bitbucketTemplateContent').value;
    const bitbucketTemplateUrl = document.getElementById('bitbucketTemplateUrl').value;
    const bitbucketOverwrite = document.getElementById('bitbucketOverwrite').checked;

    const customEnabled = document.getElementById('customRepoEnabled').checked;
    const customTemplateContent = document.getElementById('customRepoTemplateContent').value;
    const customTemplateUrl = document.getElementById('customRepoTemplateUrl').value;
    const customRepoRegex = document.getElementById('customRepoRegex').value;
    const customRepoDescriptionID = document.getElementById('customRepoDescriptionID').value;

    browser.storage.sync.set({
      githubEnabled: githubEnabled,
      githubTemplateUrl: githubTemplateUrl || '',
      githubTemplateContent: githubTemplateContent || '',
      bitbucketEnabled: bitbucketEnabled,
      bitbucketTemplateUrl: bitbucketTemplateUrl || '',
      bitbucketTemplateContent: bitbucketTemplateContent || '',
      customEnabled: customEnabled,
      customTemplateUrl: customTemplateUrl || '',
      customTemplateContent: customTemplateContent || '',
      customRepoRegex: customRepoRegex || '',
      customRepoDescriptionID: customRepoDescriptionID || '',
      bitbucketOverwrite: bitbucketOverwrite

    }).then(() => {
      // Update status to let user know options were saved.
      const result = document.getElementById('save-result');
      result.className = result.className.replace(/\bhide\b/, '');

      setTimeout(function () {
        result.className = result.className + ' hide';
      }, 1500);
    }).catch((e) => {
      console.error('Could not save options.', e);
    });
  }

  // Restores select box and checkbox state using the preferences
  // stored in browser.storage.
  function restoreOptions () {
    browser.storage.sync.get({
      githubEnabled: true,
      githubTemplateUrl: '',
      githubTemplateContent: '',
      bitbucketEnabled: true,
      bitbucketTemplateUrl: '',
      bitbucketTemplateContent: '',
      bitbucketOverwrite: true,

      customEnabled: true,
      customTemplateUrl: '',
      customTemplateContent: '',
      customRepoRegex: '',
      customRepoDescriptionID: ''

    }).then((items) => {
      document.getElementById('githubEnabled').checked = items.githubEnabled;
      document.getElementById('githubTemplateUrl').value = items.githubTemplateUrl;
      document.getElementById('githubTemplateContent').value = items.githubTemplateContent;
      document.getElementById('bitbucketEnabled').checked = items.bitbucketEnabled;
      document.getElementById('bitbucketTemplateUrl').value = items.bitbucketTemplateUrl;
      document.getElementById('bitbucketTemplateContent').value = items.bitbucketTemplateContent;
      document.getElementById('bitbucketOverwrite').checked = items.bitbucketOverwrite;

      document.getElementById('customRepoEnabled').checked = items.customEnabled;
      document.getElementById('customRepoTemplateUrl').value = items.customTemplateUrl;
      document.getElementById('customRepoTemplateContent').value = items.customTemplateContent;
      document.getElementById('customRepoRegex').value = items.customRepoRegex;
      document.getElementById('customRepoDescriptionID').value = items.customRepoDescriptionID;
    }).catch((e) => {
      console.error('Could not retrieve options.', e);
    });
  }

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
})();

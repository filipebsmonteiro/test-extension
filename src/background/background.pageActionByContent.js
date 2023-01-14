// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Update the declarative rules on install or upgrade.
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains a <video> tag...
        new chrome.declarativeContent.PageStateMatcher({
          css: ["video"]
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});


// browser.scripting.executeScript({
//   files: [`src/content-script/main.js`],
//   target: { tabId: tab.id },
// });

// browser.storage.local.get("urls").then(({urls}) => {
//   return browser.tabs.query({url: urls});
// }).then(tabs => {
//   return Promise.all(
//     Array.from(tabs, tab => browser.tabs.reload(tab.id))
//   );
// }).then(() => {
//   return browser.notifications.create({
//     type: "basic",
//     iconUrl: "icon.png",
//     title: "Tabs reloaded",
//     message: "Your tabs have been reloaded",
//   });
// }).catch(error => {
//   console.error(`An error occurred while reloading tabs: ${error.message}`);
// });

import browser from "webextension-polyfill";
console.log(`Hello from the background!`);

browser.runtime.onInstalled.addListener((details) => {
  console.log(`Extension installed:`, details);
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: `content-script.js` });
});

import browser from "webextension-polyfill";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  // console.clear();
  console.log(`background/main.js Loaded!`);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`content script sent a message: ${request}`);
  sendResponse({ response: `response from background script` });
});

browser.runtime.onInstalled.addListener((details) => {
  console.log(`Extension installed:`, details);
});

browser.runtime.onConnect.addListener((port) => {
  console.log(`browser.runtime.onConnect`, port);
});

browser.tabs.onUpdated.addListener((tabId, { status }, tab) => {
  if (status === `complete`) {
    console.log(`browser.tabs.onUpdated`, tab);
  }
});

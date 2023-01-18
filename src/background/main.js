import browser from "webextension-polyfill";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  // console.clear();
  console.log(`background/main.js Loaded!`);
}

browser.tabs.onUpdated.addListener((tabId, { status }, tab) => {
  if (status === `complete`) {
    console.log(`browser.tabs.onUpdated`, tab);
  }
});

browser.runtime.onInstalled.addListener(({ reason }) => {
  console.log(`browser.runtime.onInstalled`);
  console.log(`Install Reason :>>`, reason);
  // browser.runtime.reload();
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`browser.runtime.onMessage`, request);
  sendResponse({ response: `response from background script` });
});

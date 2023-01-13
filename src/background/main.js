import browser from "webextension-polyfill";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  // console.clear();
  console.log(`background/main.js Loaded!`);
}

function handleMessage(request, sender, sendResponse) {
  console.log(`content script sent a message: ${request.content}`);
  sendResponse({ response: `response from background script` });
}

browser.runtime.onMessage.addListener(handleMessage);

// browser.runtime.onInstalled.addListener((details) => {
//   console.log("Extension installed:", details);
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

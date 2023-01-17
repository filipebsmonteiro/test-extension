import browser from "webextension-polyfill";
console.log(`Hello from the background!`);

browser.runtime.onInstalled.addListener((details) => {
  console.log(`Extension installed:`, details);
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: `content-script.js` });
});

// const updateCelular = (elementId) => {
//   console.log(`Dentro da funcao: `, elementId);
// }
// browser.scripting.executeScript(
//   {
//     target: { tabId: 1040696320 },
//     // files: ['script.js'],
//     func: updateCelular,
//     args: [{hello: `asdfasdf`}],
//   },
//   ((result) => {
//     console.log(result);
//     const lastErr = browser.runtime.lastError;
//     if (lastErr) console.log('tab: ' + 1040696320 + ' lastError: ' + JSON.stringify(lastErr));
// })
// );

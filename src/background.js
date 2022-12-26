import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

// function reddenPage() {
//   document.body.style.backgroundColor = 'red';
// }
// chrome.action.onClicked.addListener((tab) => {
//   // if(!tab.url.includes("http://localhost/://")) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: reddenPage
//     });
//   // }
// });
import ParserService from "@/services/ParserService";
import browser from "webextension-polyfill";

export default class BrowserService {
  constructor() {}

  static console({ fun, params }) {
    console[fun](params);
    return true;
  }

  static navigator({ fun, params, parser }) {
    const data = params ? navigator[fun](params) : navigator[fun];
    return parser ? ParserService[parser](data) : data;
  }

  static executeScript({ script, destination }) {
    browser.tabs.executeScript(destination.id, { code: script }, (results) => {
      if (browser.runtime.lastError) {
        // Handle errors from chrome.tabs.executeScript
      }

      return results;
    });
  }

  static setStorage({ params: { storage, prop, value } }) {
    if (storage === `local`) {
      return localStorage.setItem(prop, value);
    }
  }

  static getStorage({ params: { storage, prop } }) {
    if (storage === `local`) {
      return localStorage.getItem(prop);
    }
  }

  static clearCache() {
    caches
      .keys()
      .then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));
  }

  static reloadActivePage() {
    window.location.reload();
  }
}

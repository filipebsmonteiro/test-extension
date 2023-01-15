import ParserService from "@/services/ParserService";
import browser from "webextension-polyfill";

export default class PageActionsService {

  constructor() {}

  static console({ fun, params }) {
    console[fun](params);
    return true;
  }

  static document({ fun, params, parser }) {
    const data = params ? document[fun](params) : document[fun];
    return parser ? ParserService[parser](data) : data;
  }

  static navigator({ fun, params, parser }) {
    const data = params ? navigator[fun](params) : navigator[fun];
    return parser ? ParserService[parser](data) : data;
  }

  static scrollToElement({ params: { id, ...params } }) {
    const element = document.getElementById(id);
    element.scrollIntoView(params);
    element.classList.add(`wiggle`);
    setTimeout(() => element.classList.remove(`wiggle`), 2000);
    return true;
  }

  static setProp({ params: { events, id, prop, value } }) {
    const element = document.getElementById(id);
    element[prop] = value;
    events &&
      Array.isArray(events) &&
      events.map((evt) => element.dispatchEvent(new Event(evt)));
    return true;
  }

  static setPropForced({ params: { events, id, prop, value } }) {
    const element = document.getElementById(id);

    let accumulator = ``;
    for (const index in value) {
      accumulator = `${accumulator}${value[index]}`;
      element[prop] = accumulator;
      events &&
        Array.isArray(events) &&
        events.map((evt) => element.dispatchEvent(new Event(evt)));
    }

    return true;
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

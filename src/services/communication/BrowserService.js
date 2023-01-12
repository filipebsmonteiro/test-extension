import browser from "webextension-polyfill";

export default class BrowserService {
  tabs = [];

  constructor() {}

  async loadTabs(query = { active: true, currentWindow: true }) {
    this.tabs = await browser.tabs.query(query);
  }

  async sendTabRequest({ action, fun, params, parser, to }) {
    await this.loadTabs();

    if (this.tabs.length > 1) {
      return await Promise.all(
        this.tabs.map((tab) =>
          browser.tabs.sendMessage(tab.id, { action, fun, params, parser, to })
        )
      );
    }

    return await browser.tabs.sendMessage(this.tabs[0].id, {
      action,
      fun,
      params,
      parser,
      to,
    });
  }

  async sendRunTimeRequest(Request) {
    return await browser.runtime.sendMessage(Request);
  }

  // async sendRunTimeRequest(Request, sendResponse) {
  //   return await browser.runtime.sendMessage(Request).then(
  //     (Response) => sendResponse(Response),
  //     (Error) => console.error("Error :>> ", Error)
  //   );
  // }
}

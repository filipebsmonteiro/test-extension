import browser from "webextension-polyfill";

export default class BrowserService {
  tabs = [];

  constructor() {}

  async loadTabs(query) {
    this.tabs = await browser.tabs.query(query);
  }

  async sendRequestToActiveTab(Request) {
    await this.loadTabs({ active: true, currentWindow: true });

    Request.setDestination(this.tabs[0]);
    return await browser.tabs.sendMessage(this.tabs[0].id, Request.toObject());
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

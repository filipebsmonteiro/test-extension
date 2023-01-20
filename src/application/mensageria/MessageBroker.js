import browser from "webextension-polyfill";
import RequestFactory from "@app/request/Factory";

export default class MessageBroker {
  tabs = [];
  constructor() {}

  static async loadTabs(query) {
    this.tabs = await browser.tabs.query(query);
    return this.tabs;
  }

  static async sendRequestToActiveTab(data) {
    const [activeTab] = await this.loadTabs({
      active: true,
      currentWindow: true,
    });

    const Request = RequestFactory.create(data);
    return await browser.tabs.sendMessage(activeTab.id, Request.toObject());;
  }

  static async sendRequestToAllTabs(data) {
    const tabs = await this.loadTabs();

    const Request = RequestFactory(data);
    return await Promise.all(
      tabs.map((tab) => browser.tabs.sendMessage(tab.id, Request.toObject()))
    );
  }

  static async sendRequestToBackground(Request) {
    return await browser.runtime.sendMessage(Request);
  }
}

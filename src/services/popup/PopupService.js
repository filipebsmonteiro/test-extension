import CommunicationService from "@/services/communication/CommunicationService";

export default class PopupService {
  static async sendRequestToTab({ action, fun, params, parser }) {
    const communication = new CommunicationService({
      action,
      fun,
      params,
      parser,
    });

    await communication.sendRequestToTab();
    return communication.Response;
  }

  static getElementsByTagName(selector, parser) {
    return this.sendRequestToTab({
      action: `document`,
      fun: `getElementsByTagName`,
      params: selector,
      parser: parser || `HTMLCollection`,
    });
  }

  static querySelector(selector, parser) {
    return this.sendRequestToTab({
      action: `document`,
      fun: `querySelector`,
      params: selector,
      parser: parser || `HTMLCollection`,
    });
  }

  static getFromStorage(key) {
    return this.sendRequestToTab({
      action: `getStorage`,
      params: { storage: `local`, prop: key },
    });
  }

  static setOnStorage(key, value) {
    return this.sendRequestToTab({
      action: `setStorage`,
      params: { storage: `local`, prop: key, value },
    });
  }

  static reloadPage(hard) {
    if (hard) this.sendRequestToTab({ action: `clearCache` });

    return this.sendRequestToTab({ action: `reloadActivePage` });
  }
}

import CommunicationService from "@/services/communication/CommunicationService";

export default class PopupService {
  static async sendRequestToTab({ action, fun, params, parser }) {
    const communication = new CommunicationService({
      action,
      fun,
      params,
      parser,
    });

    await communication.sendRequestToPage();
    return communication.Response;
  }

  static getElementsByTagName(selector) {
    return this.sendRequestToTab({
      action: `document`,
      fun: `getElementsByTagName`,
      params: selector,
      parser: `HTMLCollectionToFields`,
    });
  }
}

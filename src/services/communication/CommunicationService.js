import Request from "@/services/communication/Request";
import Response from "@/services/communication/Response";
import BrowserService from "@/services/communication/BrowserService";

export default class CommunicationService extends BrowserService {
  Request = null;
  Response = null;

  constructor(request, sendResponse) {
    super();
    this.Request = new Request(request);

    if (sendResponse) this.Response = new Response(sendResponse);
  }

  async sendRequestToTab() {
    await super
      .sendRequestToActiveTab(this.Request)
      .then((result) => (this.Response = result));
    return this;
  }

  async sendRequestToBackground() {
    this.Request.setDestination(`back`).validate();
    // await super.sendRunTimeRequest(this.Request.toObject(), sendResponse);
    await super.sendRunTimeRequest(this.Request.toObject());
    return this;
  }

  checkResponse() {
    if (!this.Response) throw new Error(`No Response OR sendResponse found!`);
  }

  setResponseData(data) {
    this.checkResponse();
    this.Response.data = data;
  }

  sendResponse() {
    this.checkResponse();
    this.Response.sendResponse();
  }
}

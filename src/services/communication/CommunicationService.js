import Request from "@/services/communication/Request";
import BrowserService from "@/services/communication/BrowserService";

export default class CommunicationService extends BrowserService {
  Request = null;
  Response = null;

  constructor(request) {
    super();
    this.Request = new Request(request);
  }

  async sendRequestToPage() {
    this.Request.setDestination(`content`).validate();
    await super
      .sendTabRequest(this.Request.toObject())
      .then((result) => (this.Response = result));
    return this;
  }

  async sendRequestToBackground() {
    this.Request.setDestination(`back`).validate();
    // await super.sendRunTimeRequest(this.Request.toObject(), sendResponse);
    await super.sendRunTimeRequest(this.Request.toObject());
    return this;
  }
}

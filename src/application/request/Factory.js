import Request from "@app/request/Request";

export default class Factory {
  constructor() {}

  static create(data) {
    return new Request(data);
  }

  static createVoid() {
    return new Request(() => {});
  }

  static createWithMessage(sendResponse) {
    return new Response(sendResponse);
  }
}

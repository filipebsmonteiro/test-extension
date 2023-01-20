import Response from "@app/response/Response";

export default class Factory {
  constructor() {}

  static create() {
    return new Response();
  }

  static createWithMessage(message) {
    const response = new Response();
    response.setMessage(message);
    return response;
  }

  static createWithMessageStatus(message, status) {
    const response = new Response();
    response.setMessage(message).setStatus(status);
    return response;
  }

  static createWithData(data) {
    const response = new Response();
    response.setData(data);
    return response;
  }
}

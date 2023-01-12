export default class Response {
  data = null;
  message = `Success`;
  status = 200;
  sendResponse = null;

  constructor(sendResponse) {
    this.sendResponse = () => {
      throw new Error(`No sendResponse Found to Return!`);
    };

    if (sendResponse)
      this.sendResponse = () =>
        sendResponse({
          data: this.data,
          message: this.message,
          status: this.status,
        });
  }

  static toObject() {
    return {
      data: this.data,
      message: this.message,
      status: this.status,
    };
  }
}

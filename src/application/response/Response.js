export default class Response {
  data = null;
  message = `Success`;
  status = 200;
  constructor() {}

  setData(data) {
    this.data = data;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  setStatus(status) {
    this.status = status;
    return this;
  }

  toObject() {
    return {
      data: this.data,
      message: this.message,
      status: this.status,
    };
  }
}

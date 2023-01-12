import ParserService from "@/services/ParserService";

export default class PageActionsService {
  Response = null;

  constructor(Response) {
    this.Response = Response;
  }

  console({ fun, params }) {
    console[fun](params);
  }

  document({ fun, params, parser }) {
    const data = params ? document[fun](params) : document[fun];
    this.Response.data = parser ? ParserService[parser](data) : data;
  }

  navigator({ fun, params, parser }) {
    const data = params ? navigator[fun](params) : navigator[fun];
    this.Response.data = parser ? ParserService[parser](data) : data;
  }

  setProp({ params: { events, id, prop, value } }) {
    const element = document.getElementById(id);
    element[prop] = value;
    events &&
      Array.isArray(events) &&
      events.map((evt) => element.dispatchEvent(new Event(evt)));
  }

  executeFunction({ fun, params }) {
    try {
      this.Response.data = fun.call(params);
    } catch (error) {
      console.error(error);
      this.Response.status = 500;
      this.Response.message = error.message;
    }
  }

  setStorage({ params: { storage, prop, value } }) {
    if (storage === `local`) {
      localStorage.setItem(prop, value);
    }
  }

  getStorage({ params: { storage, prop } }) {
    if (storage === `local`) {
      this.Response.data = localStorage.getItem(prop);
    }
  }
}

import ParserService from "@/services/ParserService";

export default class PageActionsService {

  constructor() {}

  static console({ fun, params }) {
    console[fun](params);
    return true;
  }

  static document({ fun, params, parser }) {
    const data = params ? document[fun](params) : document[fun];
    return parser ? ParserService[parser](data) : data;
  }

  static navigator({ fun, params, parser }) {
    const data = params ? navigator[fun](params) : navigator[fun];
    return parser ? ParserService[parser](data) : data;
  }

  static setProp({ params: { events, id, prop, value } }) {
    const element = document.getElementById(id);
    element[prop] = value;
    events &&
      Array.isArray(events) &&
      events.map((evt) => element.dispatchEvent(new Event(evt)));
    return true;
  }

  static executeFunction({ fun, params }) {
    return fun.call(params);
  }

  static setStorage({ params: { storage, prop, value } }) {
    if (storage === `local`) {
      return localStorage.setItem(prop, value);
    }
  }

  static getStorage({ params: { storage, prop } }) {
    if (storage === `local`) {
      return localStorage.getItem(prop);
    }
  }
}

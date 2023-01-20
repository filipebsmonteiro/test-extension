import ParserService from "@content/application/services/ParserService";

export default class DOMService {
  constructor() {}

  static document({ args, method, parser }) {
    const data = args ? document[method](args) : document[method];
    return parser ? ParserService[parser](data) : data;
  }

  static scrollToElement({ element, ...params }) {
    element.scrollIntoView(params);
    element.classList.add(`wiggle`);
    setTimeout(() => element.classList.remove(`wiggle`), 2000);
    return true;
  }

  static async setProp({ element, events, prop, value }) {
    if (!element) return;
    element.removeAttribute(prop);
    element.setAttribute(prop, value);

    if (events && Array.isArray(events)) {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      for (const idx in events) {
        element.dispatchEvent(new Event(events[idx]));

        await sleep(250)
          .then(() => {
            const valueKeep = element.getAttribute(prop) === value;
            if (!valueKeep) return events[idx];
          })
          .then((event) => {
            if (event)
              console.error(
                `Error on emit ${event} after set ${prop} to ${value}`
              );
          });
      }
    }

    return true;
  }

  static setPropForced({ params: { events, id, prop, value } }) {
    const element = document.getElementById(id);

    let accumulator = ``;
    for (const index in value) {
      accumulator = `${accumulator}${value[index]}`;
      element[prop] = accumulator;
      events &&
        Array.isArray(events) &&
        events.map((evt) => element.dispatchEvent(new Event(evt)));
    }

    return true;
  }
}

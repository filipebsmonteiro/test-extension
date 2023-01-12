export default class Request {
  action;
  fun;
  params;
  parser;
  destination;

  constructor({ action, fun, params, parser, destination } = {}) {
    this.action = action;
    this.fun = fun ? fun : () => null;
    this.params = params ?? null;
    this.parser = parser ?? null;
    this.destination = destination;
  }

  setDestination(destination) {
    this.destination = destination;
    return this;
  }

  validate() {
    if (!this.action) throw new Error(`Action can't be Empty!`);
    if (!this.destination) throw new Error(`Destination can't be Empty!`);
    if (![`content`, `background`, `popup`].includes(this.destination))
      throw new Error(
        `Accepted values to Destination: [content, background, popup]`
      );
    return this;
  }

  toObject() {
    return {
      action: this.action,
      fun: this.fun,
      params: this.params,
      parser: this.parser,
      destination: this.destination,
    };
  }
}

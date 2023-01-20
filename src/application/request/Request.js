export default class Request {
  args;
  controller;
  destination = `tabs`;
  method;
  origin;
  parser;
  script;

  constructor({
    args,
    controller,
    destination,
    method,
    origin,
    parser,
    script,
  } = {}) {
    this.args = args ?? undefined;
    this.controller = controller ?? null;
    this.destination = destination ?? this.destination;
    this.method = method ?? null;
    this.origin = origin ?? null;
    this.parser = parser ?? undefined;
    this.script = script ?? undefined;
  }

  toObject() {
    return {
      args: this.args,
      controller: this.controller,
      destination: this.destination,
      method: this.method,
      origin: this.origin,
      parser: this.parser,
      script: this.script,
    };
  }
}

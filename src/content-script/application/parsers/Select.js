import Input from "@content/application/parsers/Input";

export default class Select extends Input {
  constructor() {
    super();
  }

  static getOptions(htmlElement) {
    if (htmlElement.options)
      return [...htmlElement.options].map((o) => ({
        id: super.getIdentifier(o),
        disabled: o.disabled,
        value: o.value ?? o.innerHTML,
        text: o.innerHTML,
      }));

    return null;
  }

  static parseElement(htmlElement) {
    return {
      ...super.parseElement(htmlElement),
      options: this.getOptions(htmlElement),
    };
  }
}

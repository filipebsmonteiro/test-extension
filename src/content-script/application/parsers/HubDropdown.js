import Input from "@content/application/parsers/Input";

export default class HubDropdown extends Input {
  constructor() {
    super();
  }

  static getOptions(htmlElement) {
    if (htmlElement.options)
      return [...htmlElement.children].map((o) => ({
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
      type: `HubDropdown`,
      options: this.getOptions(htmlElement),
    };
  }
}

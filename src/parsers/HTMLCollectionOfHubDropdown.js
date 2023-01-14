import HTMLCollectionOfInput from "@/parsers/HTMLCollectionOfInput";

export default class HTMLCollectionToFields extends HTMLCollectionOfInput {
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
      options: this.getOptions(htmlElement),
    };
  }
}

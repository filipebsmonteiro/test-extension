import HTML from "@content/application/parsers/HTML";

export default class Input extends HTML {
  constructor() {
    super();
  }

  static getName(htmlElement) {
    let name = null;
    if (htmlElement.name) return htmlElement.name;

    let element = htmlElement;
    for (let i = 0; i < 10; i++) {
      element = element?.previousSibling;
      if (element && element.tagName === `LABEL`) return element.innerHTML;
    }

    return name;
  }

  static parseElement(htmlElement) {
    return {
      ...super.parseElement(htmlElement),
      name: this.getName(htmlElement),
      placeholder: htmlElement.getAttribute(`placeholder`),
      type: htmlElement.type,
      value: htmlElement.value,
    };
  }

  static parse(collection) {
    return Array.from(collection).map((element) => this.parseElement(element));
  }
}

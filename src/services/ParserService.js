import { v4 as uuid } from "uuid";

export default class ParserService {
  constructor() {}

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

  static getIdentifier(htmlElement) {
    if (!htmlElement.id) htmlElement.id = uuid();
    return htmlElement.id;
  }

  static getOptions(htmlElement) {
    if (htmlElement.options)
      return [...htmlElement.options].map((o) => ({
        id: this.getIdentifier(o),
        disabled: o.disabled,
        value: o.valeu ?? o.innerHTML,
        text: o.innerHTML,
      }));

    return null;
  }

  static HTMLCollectionToFields(collection) {
    return Array.from(collection).map((element) => {
      const isVisible = (elmnt) => {
        const style = window.getComputedStyle(elmnt);
        return (
          elmnt.type !== `hidden` &&
          style.getPropertyValue(`display`) !== `none` &&
          style.getPropertyValue(`visibility`) !== `hidden`
        );
      };

      return {
        id: this.getIdentifier(element),
        isVisible: isVisible(element),
        name: this.getName(element),
        options: this.getOptions(element),
        placeholder: element.getAttribute(`placeholder`),
        type: element.type,
        value: element.value,
      };
    });
  }
}

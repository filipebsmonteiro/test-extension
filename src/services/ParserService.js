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
        type: element.type,
        name: this.getName(element),
        placeholder: element.getAttribute(`placeholder`),
        value: element.value,
        isVisible: isVisible(element),
      };
    });
  }
}

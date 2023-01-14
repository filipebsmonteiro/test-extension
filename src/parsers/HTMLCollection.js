import { v4 as uuid } from "uuid";

export default class HTMLCollection {
  constructor() {}

  static getIdentifier(htmlElement) {
    if (!htmlElement.id) htmlElement.id = uuid();
    return htmlElement.id;
  }

  static isVisible(htmlElement) {
    const style = window.getComputedStyle(htmlElement);
    return (
      htmlElement.type !== `hidden` &&
      style.getPropertyValue(`display`) !== `none` &&
      style.getPropertyValue(`visibility`) !== `hidden`
    );
  }

  static parseElement(htmlElement) {
    return {
      id: this.getIdentifier(htmlElement),
      isVisible: this.isVisible(htmlElement),
    };
  }
}

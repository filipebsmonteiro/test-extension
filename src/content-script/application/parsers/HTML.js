import { v4 as uuid } from "uuid";

export default class HTML {
  constructor() {}

  static getIdentifier(htmlElement) {
    if (htmlElement.id) return htmlElement.id;
    return uuid();
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
      element: htmlElement,
      id: this.getIdentifier(htmlElement),
      isVisible: this.isVisible(htmlElement),
    };
  }
}

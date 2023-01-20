import HTML from "@content/application/parsers/HTML";
import HubDropdown from "@content/application/parsers/HubDropdown";
import Input from "@content/application/parsers/Input";
import Select from "@content/application/parsers/Select";

export default class ParserService {
  constructor() {}

  static isValid(collection) {
    if (!collection) return false;
    return typeof collection[Symbol.iterator] === `function`;
  }

  static HTML(collection) {
    if (this.isValid(collection))
      return Array.from(collection).map((element) =>
        HTML.parseElement(element)
      );
  }

  static HubDropdown(collection) {
    if (this.isValid(collection))
      return Array.from(collection).map((element) =>
        HubDropdown.parseElement(element)
      );
  }

  static Input(collection) {
    if (this.isValid(collection))
      return Array.from(collection).map((element) =>
        Input.parseElement(element)
      );
  }

  static Select(collection) {
    return Array.from(collection).map((element) =>
      Select.parseElement(element)
    );
  }
}

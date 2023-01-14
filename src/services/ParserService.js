import HTMLCollection from "@/parsers/HTMLCollection";
import HTMLCollectionOfHubDropdown from "@/parsers/HTMLCollectionOfHubDropdown";
import HTMLCollectionOfInput from "@/parsers/HTMLCollectionOfInput";
import HTMLCollectionOfSelect from "@/parsers/HTMLCollectionOfSelect";

export default class ParserService {
  constructor() {}

  static isValid(collection) {
    if (!collection) return false;
    return typeof collection[Symbol.iterator] === `function`;
  }

  static HTMLCollection(collection) {
    if (this.isValid(collection))
      return Array.from(collection).map((element) =>
        HTMLCollection.parseElement(element)
      );
  }

  static HTMLCollectionOfHubDropdown(collection) {
    if (this.isValid(collection))
      return Array.from(collection).map((element) =>
        HTMLCollectionOfHubDropdown.parseElement(element)
      );
  }

  static HTMLCollectionOfInput(collection) {
    if (this.isValid(collection))
      return Array.from(collection).map((element) =>
        HTMLCollectionOfInput.parseElement(element)
      );
  }

  static HTMLCollectionOfSelect(collection) {
    return Array.from(collection).map((element) =>
      HTMLCollectionOfSelect.parseElement(element)
    );
  }
}

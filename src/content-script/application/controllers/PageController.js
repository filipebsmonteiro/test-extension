import DOMService from "@content/application/services/DOMService";
import { useFieldsStore } from "@content/resources/stores/fields";

const fieldsStore = useFieldsStore();

export default class PageController {
  constructor({ fromBuilder }) {
    if (!fromBuilder) throw new Error(`Cannot be called directly`);
  }

  static async build() {
    return new PageController({ fromBuilder: true });
  }

  scrollToElement({ id, ...args }) {
    const { element } = fieldsStore.getField(id);
    DOMService.scrollToElement({ element, ...args });
  }
}

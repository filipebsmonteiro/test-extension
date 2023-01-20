import DOMService from "@content/application/services/DOMService";
import { useFieldsStore } from "@content/resources/stores/fields";

export default class HubDropdowns {
  constructor() {}

  static load() {
    const dropdowns = DOMService.document({
      method: `querySelector`,
      params: `.hub-dropdown > .mobile-hidden > .hub-dropdown-option-container > ul`,
      parser: `HubDropdown`,
    });

    return dropdowns ? dropdowns.filter((f) => f.isVisible && f.id) : [];
  }

  static async fill(dropdown) {
    const validOption = dropdown.options.find(
      (option) =>
        option.value &&
        !option.disabled &&
        ![`Select`, `Selecione`, `Escolha`].includes(option.text)
    );

    if (validOption) {
      await DOMService.setProp({
        element: dropdown.element,
        prop: `class`,
        value: `selected`,
        events: [`click`],
      });

      const fieldsStore = useFieldsStore();
      fieldsStore.updateField(dropdown.id, { value: validOption.value });
    }

    return null;
  }
}

import DOMService from "@content/application/services/DOMService";
import { useFieldsStore } from "@content/resources/stores/fields";

export default class Selects {
  constructor() {}

  static load() {
    const selects = DOMService.document({
      method: `getElementsByTagName`,
      args: `select`,
      parser: `Select`,
    });

    return selects ? selects.filter((f) => f.isVisible && f.id) : [];
  }

  static async fill(select) {
    const validOption = select.options.find(
      (option) =>
        option.value &&
        !option.disabled &&
        ![`Escolha`, `Select`, `Selecione`].includes(option.text)
    );

    if (validOption) {
      await DOMService.setProp({
        element: validOption.element,
        prop: `value`,
        value: true,
      });

      await DOMService.setProp({
        id: select.element,
        prop: `selectedIndex`,
        value: select.options.findIndex((o) => o.id === validOption.id),
        events: [`input`, `change`],
      });

      const fieldsStore = useFieldsStore();
      fieldsStore.updateField(select.id, { value: validOption.value });
    }

    return null;
  }
}

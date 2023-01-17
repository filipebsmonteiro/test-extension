import PopupService from "@/services/popup/PopupService";

export default class Selects {
  constructor() {}

  static async load() {
    return await PopupService.getElementsByTagName(
      `select`,
      `HTMLCollectionOfSelect`
    ).then(({ data = [] }) => data.filter((f) => f.isVisible && f.id));
  }

  static fill(select) {
    const validOption = select.options.find(
      (option) =>
        option.value &&
        !option.disabled &&
        ![`Escolha`, `Select`, `Selecione`].includes(option.text)
    );

    if (validOption) {
      PopupService.sendRequestToTab({
        action: `setProp`,
        params: {
          id: validOption.id,
          prop: `value`,
          value: true,
        },
      });

      PopupService.sendRequestToTab({
        action: `setProp`,
        params: {
          id: select.id,
          prop: `selectedIndex`,
          value: select.options.findIndex((o) => o.id === validOption.id),
          events: [`input`, `change`],
        },
      });

      return {
        ...select,
        newValue: validOption.value,
      };
    }

    return null;
  }
}

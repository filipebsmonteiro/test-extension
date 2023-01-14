import PopupService from "@/services/popup/PopupService";

export default class HubDropdowns {
  constructor() {}

  static async load() {
    return await PopupService.querySelector(
      `.hub-dropdown > .mobile-hidden > .hub-dropdown-option-container > ul`,
      `HTMLCollectionOfHubDropdown`
    ).then(({ data }) => data.filter((f) => f.isVisible && f.id));
  }

  static async fill(dropdown) {
    const validOption = dropdown.options.find(
      (option) =>
        option.value &&
        !option.disabled &&
        ![`Select`, `Selecione`, `Escolha`].includes(option.text)
    );

    if (validOption) {
      PopupService.sendRequestToTab({
        action: `setProp`,
        params: {
          id: dropdown.id,
          prop: `class`,
          value: `selected`,
          events: [`click`],
        },
      });
    }
  }
}

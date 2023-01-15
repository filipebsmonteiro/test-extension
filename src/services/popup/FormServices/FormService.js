import PopupService from "@/services/popup/PopupService";
import Inputs from "@/services/popup/FormServices/Inputs";
import Selects from "@/services/popup/FormServices/Selects";
import HubDropdowns from "@/services/popup/FormServices/HubDropdowns";

export default class FormService {
  Inputs = null;

  constructor({ locale, email: { domain } }) {
    if (typeof locale === `undefined` || typeof domain === `undefined`)
      throw new Error(`Cannot be called directly`);

    this.Inputs = new Inputs();
    this.Inputs.setLocale(locale || `pt_BR`);
    this.Inputs.setEmailDomain(domain);
  }

  static async build() {
    const locale = await PopupService.getFromStorage(`language`).then(
      ({ data }) => data || `pt_BR`
    );

    const domain = await PopupService.getFromStorage(`email.domain`).then(
      ({ data }) => data || ``
    );

    return new FormService({ locale, email: { domain } });
  }

  async loadFields() {
    return await Promise.all([
      Inputs.load(),
      Selects.load(),
      HubDropdowns.load(),
    ]).then(([inputs, selects, hubDropdowns]) => ({
      inputs,
      selects,
      hubDropdowns,
    }));
  }

  async fillFields({ inputs, selects, hubDropdowns, force }) {
    return {
      inputs: inputs.map((input) => this.Inputs.fill({ ...input, force })),
      selects: selects.map((select) => Selects.fill(select)),
      hubDropdowns: hubDropdowns.map((dropdown) => HubDropdowns.fill(dropdown)),
    }
  }
}

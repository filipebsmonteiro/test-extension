import Inputs from "@content/application/services/form/Inputs";
import Selects from "@content/application/services/form/Selects";
import HubDropdowns from "@content/application/services/form/HubDropdowns";
import ResponseFactory from "@app/response/Factory";
import BrowserControllerClass from "@content/application/controllers/BrowserController";
import { useFieldsStore } from "@content/resources/stores/fields";
import { toRaw } from "vue";

const fieldsStore = useFieldsStore();

export default class FormController {
  Inputs = null;

  constructor({ locale, email: { domain } }) {
    if (typeof locale === `undefined` || typeof domain === `undefined`)
      throw new Error(`Cannot be called directly`);

    this.Inputs = new Inputs();
    this.Inputs.setLocale(locale);
    this.Inputs.setEmailDomain(domain);
  }

  static async build() {
    const BrowserController = await BrowserControllerClass.build();
    const locale =
      BrowserController.getStorage({ key: `language` }).data || `pt_BR`;
    const domain =
      BrowserController.getStorage({ key: `email.domain` }).data || ``;

    return new FormController({ locale, email: { domain } });
  }

  loadFields() {
    const fields = [
      ...Inputs.load(),
      ...Selects.load(),
      ...HubDropdowns.load(),
    ];

    // fieldsStore.cleanStorage();
    fields.map((field) => fieldsStore.addField(field));

    return ResponseFactory.createWithData(fieldsStore.fields);
  }

  async fillFields() {
    const promisses = toRaw(fieldsStore.fields).map(async (field) => {
      switch (field.type) {
        case `text`:
        case `email`:
          return await this.Inputs.fill(field);
        case `select-one`:
          return await Selects.fill(field);
        case `HubDropdown`:
          return await HubDropdowns.fill(field);
        default:
          break;
      }
    });
    return await Promise.all(promisses).then(() => true);
  }
}

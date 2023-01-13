import { faker } from "@faker-js/faker";
import { fakerBr } from "js-brasil";
import PopupService from "@/services/popup/PopupService";
import Validations from "@/services/popup/validations";

export default class FillFormService {
  ready = false;
  email = { domain: undefined };

  constructor({ locale, email: { domain } }) {
    if (typeof locale === `undefined` || typeof domain === `undefined`)
      throw new Error(`Cannot be called directly`);

    faker.locale = locale || `pt_BR`;
    this.email.domain = domain;
  }

  static async build() {
    const locale = await PopupService.getFromStorage(`language`).then(
      ({ data }) => data || `pt_BR`
    );

    const domain = await PopupService.getFromStorage(`email.domain`).then(
      ({ data }) => data || ``
    );

    return new FillFormService({ locale, email: { domain } });
  }

  generateValue(field) {
    if (Validations.isEmail(field))
      return faker.internet.email(undefined, undefined, this.email.domain);

    if (Validations.isName(field)) return faker.name.fullName();

    if (Validations.isPhone(field)) return faker.phone.number();

    const doc = Validations.Documents.isBrazillian(field);
    if (doc) return fakerBr[doc]().replace(/\D+/g, ``);

    const car = Validations.Car.isBrazillian(field);
    if (car && field.type === `text`) return fakerBr[car]();

    return null;
  }

  fillField(field) {
    const value = this.generateValue(field);

    if (value)
      PopupService.sendRequestToTab({
        action: `setProp`,
        params: {
          id: field.id,
          prop: `value`,
          value,
          events: [`change`, `input`],
        },
      });
  }
}

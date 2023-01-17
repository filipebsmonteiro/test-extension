import { faker } from "@faker-js/faker";
import { fakerBr } from "js-brasil";
import PopupService from "@/services/popup/PopupService";
import Validations from "@/services/popup/validations";

export default class Inputs {
  email = { domain: undefined };

  setLocale(locale) {
    faker.locale = locale;
  }

  setEmailDomain(domain) {
    this.email.domain = domain;
  }

  static async load() {
    return await PopupService.getElementsByTagName(
      `input`,
      `HTMLCollectionOfInput`
    ).then(({ data = [] }) =>
      data.filter((f) => f.type !== `checkbox` && f.isVisible && f.id && f.name)
    );
  }

  generateValue(Field) {
    const field = Object.assign({}, Field);
    if (field.name) field.name = field.name.toLowerCase();

    if (Validations.isEmail(field))
      return faker.internet.email(undefined, undefined, this.email.domain);

    if (Validations.isName(field)) return faker.name.fullName();

    if (Validations.isPhone(field))
      return faker.phone.number().replace(/\D+/g, ``);

    const doc = Validations.Documents.isBrazillian(field);
    if (doc) return fakerBr[doc]().replace(/\D+/g, ``);

    const car = Validations.Car.isBrazillian(field);
    if (car && field.type === `text`) return fakerBr[car]();

    return null;
  }

  fill(field) {
    const value = this.generateValue(field);

    if (value) {
      PopupService.sendRequestToTab({
        action: field.force ? `setPropForced` : `setProp`,
        params: {
          id: field.id,
          prop: `value`,
          value,
          events: [`input`, `change`],
        },
      });

      return {
        ...field,
        newValue: value,
      };
    }

    return null;
  }
}

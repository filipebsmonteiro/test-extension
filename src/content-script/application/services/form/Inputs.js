import { Faker, allLocales } from "@faker-js/faker";
import { fakerBr } from "@js-brasil/fakerbr";
import DOMService from "@content/application/services/DOMService";
import Validations from "@content/application/services/form/validations";
import { useFieldsStore } from "@content/resources/stores/fields";

export default class Inputs {
  email = { domain: undefined };

  setLocale(locale) {
    const language = allLocales[locale];
    this.faker = new Faker({ locale: language })
  }

  setEmailDomain(domain) {
    this.email.domain = domain || undefined;
  }

  static load() {
    const inputs = DOMService.document({
      method: `getElementsByTagName`,
      args: `input`,
      parser: `Input`,
    });

    return inputs
      ? inputs.filter(
          (f) => f.type !== `checkbox` && f.isVisible && f.id && f.name
        )
      : [];
  }

  generateValue(Field) {
    const field = Object.assign({}, Field);
    if (field.name) field.name = field.name.toLowerCase();

    if (Validations.isEmail(field))
      return this.faker.internet.email(undefined, undefined, this.email.domain);

    if (Validations.isName(field)) return this.faker.person.fullName();

    if (Validations.isPhone(field))
      return this.faker.phone.number().replace(/\D+/g, ``);

    const doc = Validations.Documents.isBrazilian(field);
    if (doc) return fakerBr[doc]().replace(/\D+/g, ``);

    const car = Validations.Car.isBrazilian(field);
    if (car && field.type === `text`) return fakerBr[car]();

    return null;
  }

  async fill(field) {
    const value = this.generateValue(field);

    if (value) {
      await DOMService.setProp({
        element: field.element,
        prop: `value`,
        value,
        events: [`input`, `change`],
      });

      const fieldsStore = useFieldsStore();
      fieldsStore.updateField(field.id, { value });
    }

    return;
  }
}

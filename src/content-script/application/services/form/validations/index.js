import isEmail from "@content/application/services/form/validations/email";
import isName from "@content/application/services/form/validations/name";
import isPhone from "@content/application/services/form/validations/phone";
import isBrazilianDoc from "@content/application/services/form/validations/pt_BR/document";
import isBrazilianCar from "@content/application/services/form/validations/pt_BR/car";

export default {
  isEmail,
  isName,
  isPhone,
  Documents: {
    isBrazilian: isBrazilianDoc,
  },
  Car: {
    isBrazilian: isBrazilianCar,
  },
};

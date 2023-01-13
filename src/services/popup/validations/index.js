import isEmail from "@/services/popup/validations/email";
import isName from "@/services/popup/validations/name";
import isPhone from "@/services/popup/validations/phone";
import isBrazillianDoc from "@/services/popup/validations/pt_BR/document";
import isBrazillianCar from "@/services/popup/validations/pt_BR/car";

export default {
  isEmail,
  isName,
  isPhone,
  Documents: {
    isBrazillian: isBrazillianDoc,
  },
  Car: {
    isBrazillian: isBrazillianCar,
  },
};

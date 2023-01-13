const translations = [`telefone`, `celular`, `phone`, `cellphone`];

const isPhone = (field) => {
  if (translations.some((t) => field.name.includes(t))) return true;

  if (translations.some((t) => field.placeholder.includes(t))) return true;

  return false;
};

export default isPhone;

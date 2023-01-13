const translations = [`cpf`, `cnpj`, `rg`];

const isBrazillian = (field) => {
  if (translations.some((t) => field.name.includes(t)))
    return translations.find((t) => field.name.includes(t));

  if (translations.some((t) => field.placeholder.includes(t)))
    return translations.find((t) => field.placeholder.includes(t));

  return false;
};

export default isBrazillian;

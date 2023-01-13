const translations = [`email`, `e-mail`];

const isEmail = (field) => {
  if (field.type === `email`) return true;

  if (translations.some((t) => field.name.includes(t))) return true;

  if (translations.some((t) => field.placeholder.includes(t))) return true;

  return false;
};

export default isEmail;

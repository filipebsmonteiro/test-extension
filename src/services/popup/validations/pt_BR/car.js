const translations = [
  `placa`,
  `chassi`,
  `marca`,
  `modelo`,
  `categoria`,
  `especie`,
  `restricao`,
  `restrição`,
  `tipo`,
  `carroceria`,
  `combustivel`,
  `combustível`,
];

const isBrazillian = (field) => {
  if (translations.some((t) => field.name?.includes(t)))
    return translations
      .find((t) => field.name.includes(t))
      .normalize(`NFD`)
      .replace(/[\u0300-\u036f]/g, ``);

  if (translations.some((t) => field.placeholder?.includes(t)))
    return translations
      .find((t) => field.placeholder.includes(t))
      .normalize(`NFD`)
      .replace(/[\u0300-\u036f]/g, ``);

  return false;
};

export default isBrazillian;

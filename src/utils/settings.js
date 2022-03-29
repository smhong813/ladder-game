export const makeOptions = (options, lang) => {
  return options.map((option) => {
    const newOption = {
      ...option,
      value: option.value[lang],
    };
    if (option.description) {
      newOption.description = option.description;
    }
    if (option.options) {
      newOption.options = option.options;
    }
    if (option.chance) {
      newOption.chance = option.chance;
    }
    return newOption;
  });
};

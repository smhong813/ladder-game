export const makeOptions = (options) => {
  return options.map((option) => {
    const newOption = {
      ...option,
      value: option.value['en'],
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

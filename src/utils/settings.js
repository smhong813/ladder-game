export const makeOptions = (options) => {
  return options.map((option) => {
    const newOption = {
      ...option,
      value: option.value['ko'],
    };
    if (option.description) {
      newOption.description = option.description;
    }
    return newOption;
  });
};

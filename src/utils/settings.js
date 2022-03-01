export const makeOptions = (options) => {
  return options.map((option) => ({
    ...option,
    value: option.value['ko'],
  }));
};
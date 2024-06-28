interface NumberInputValue {
  value: string;
  notShow: boolean;
  floatValue: number;
}

const processInput = (input: string): string => {
  const processedInput = input.replace(/\s/g, '').replace(/\,/g, '.').replace(/^0+/, '0');

  return processedInput.startsWith('-') ? processedInput.replace('-', '') : processedInput;
};

const checkDecimalLimit = (input: string): boolean => {
  const formattedInput = input.replace(/\s/g, '').replace(/\,/g, '.');
  return formattedInput.length > 4 && formattedInput.indexOf('.') + 4 === formattedInput.length;
};

export const setNumberInputValue = (input: string, isLimited?: boolean): NumberInputValue => {
  const processedInput = processInput(input);
  const notShow = !isLimited && checkDecimalLimit(processedInput);
  const floatValue = Number(processedInput);

  return {
    value: processedInput,
    notShow,
    floatValue
  };
};

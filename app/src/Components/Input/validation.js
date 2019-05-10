export const integers = (text) => /^-?\d*$/.test(text);
export const positiveIntegers = (text) => /^\d*$/.test(text);
export const floats = (text) => /^-?\d*[.,]?\d*$/.test(text);
export const positiveFloats = (text) => /^\d*[.,]?\d*$/.test(text);
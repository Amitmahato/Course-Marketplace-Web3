export const camelCaseToTitleCaseString = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const isHex = (hex: string) => {
  hex = hex.startsWith("0x") ? hex.substring(2) : hex;
  return parseInt(hex, 16).toString(16) === hex;
};

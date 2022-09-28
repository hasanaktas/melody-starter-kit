export const isEmpty = (text: string) => !text;

export const isStartCapitalLetter = (text: string) => {
  const pattern = /^^[A-Z].*$/;
  return !pattern.test(text);
};

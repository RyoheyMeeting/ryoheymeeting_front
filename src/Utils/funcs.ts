export const and = (arg: boolean[]): boolean => {
  let res = true;
  arg.forEach((e) => {
    res = res && e;
  });
  return res;
};

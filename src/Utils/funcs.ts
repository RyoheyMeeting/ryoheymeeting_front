export const and = (arg: boolean[]): boolean => {
  let res = true;
  arg.forEach((e) => {
    res = res && e;
  });
  return res;
};

export const clamp = (x: number): number => {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
};

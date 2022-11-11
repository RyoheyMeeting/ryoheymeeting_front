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

export const max = (a: number, b: number): number => {
  if (a > b) return a;
  else return b;
};

export const dateToTime = (date: Date): string => {
  return date.toISOString().slice(14, 19);
};

/**
 * リストの中からランダムに値を選択する
 * @param array 対象リスト
 * @returns ランダムに選ばれた要素
 */
export const randomChoice = <T>(array: T[]) => {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
};

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

const WEEK: { [key: number]: string } = {
  0: "日曜日",
  1: "月曜日",
  2: "火曜日",
  3: "水曜日",
  4: "木曜日",
  5: "金曜日",
  6: "土曜日",
};

export const dateToFormat = (
  target: Date,
  /**
   * Y : Year
   * M : Month
   * D : Date
   * W : Week
   * h : hour
   * m : minute
   * s : second
   * l : millisecond
   *
   * ex.: Y/M/D h:m:s -> 2022/11/16 19:17:22
   */
  format: string
) => {
  const year = target.getFullYear();
  const month = target.getMonth() + 1;
  const date = target.getDate();
  const week = WEEK[target.getDay()];
  const hour = target.getHours();
  const minute = target.getMinutes();
  const second = target.getSeconds();
  const millisecond = target.getMilliseconds();

  return format
    .replace(/Y/g, String(year))
    .replace(/M/g, String(month))
    .replace(/D/g, String(date))
    .replace(/W/g, String(week))
    .replace(/h/g, String(hour))
    .replace(/m/g, String(minute))
    .replace(/s/g, String(second))
    .replace(/l/g, String(millisecond));
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

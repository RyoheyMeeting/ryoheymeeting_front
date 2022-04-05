export type Dict<T> = {
  [key: string]: T;
};

export type ButtonOpts = {
  disabled?: boolean;
  handler?: () => void;
};

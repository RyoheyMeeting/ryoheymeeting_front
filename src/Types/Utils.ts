import { ComponentType } from "react";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";

export type Dict<T> = {
  [key: string]: T;
};

export type ButtonOpts = {
  disabled?: boolean;
  handler?: () => void;
};

export type Icon = ComponentType<IconProps>;

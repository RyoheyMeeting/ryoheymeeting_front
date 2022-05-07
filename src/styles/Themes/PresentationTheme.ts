import { DefaultTheme } from "./DefaultTheme";

export const PresentationTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  global: {
    ...DefaultTheme.global,
  },
};

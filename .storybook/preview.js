import { GlobalStyle } from "../src/styles/GlobalStyle/GlobalStyle";
import { DefaultTheme } from "../src/styles/Themes/DefaultTheme";
import "ress";
import { ThemeProvider } from "styled-components";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
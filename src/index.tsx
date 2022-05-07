import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reportWebVitals from "reportWebVitals";
import { store } from "store";
import "ress";
import { GlobalStyle } from "styles/GlobalStyle/GlobalStyle";
import App from "App";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styles/Themes/DefaultTheme";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

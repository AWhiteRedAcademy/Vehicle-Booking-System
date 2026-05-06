import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: ${theme.colors.background};
    color: ${theme.colors.textDark};
  }

  button,
  input {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
// import { createGlobalStyle } from "styled-components";
// import { theme } from "./theme";

// export const GlobalStyles = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//   }

//   body {
//     margin: 0;
//     font-family: Arial, Helvetica, sans-serif;
//     background: ${theme.colors.background};
//     color: ${theme.colors.textDark};
//   }

//   button,
//   input {
//     font-family: inherit;
//   }

//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;

import { createGlobalStyle } from "styled-components";
 
export const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #0b5ed7;
    --color-primary-dark: #084eb4;
 
    --color-page-bg: #f5f7fb;
    --color-card-bg: #ffffff;
    --color-sidebar-bg: #ffffff;
 
    --color-text: #061827;
    --color-text-muted: #64748b;
 
    --color-border: #dbe4ef;
    --color-input-bg: #f8fafc;
 
    --shadow-card: 0 14px 35px rgba(15, 23, 42, 0.06);
    --shadow-button: 0 12px 24px rgba(11, 94, 215, 0.24);
  }
 
  [data-theme="dark"] {
    --color-page-bg: #07111f;
    --color-card-bg: #0f1b2d;
    --color-sidebar-bg: #061827;
 
    --color-text: #f8fafc;
    --color-text-muted: #94a3b8;
 
    --color-border: #243247;
    --color-input-bg: #111f33;
 
    --shadow-card: 0 14px 35px rgba(0, 0, 0, 0.25);
    --shadow-button: 0 12px 24px rgba(11, 94, 215, 0.35);
  }
 
  * {
    box-sizing: border-box;
  }
 
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--color-page-bg);
    color: var(--color-text);
  }
 
  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }
`;
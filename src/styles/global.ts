import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`${css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 2px solid ${({ theme }) => theme.COLORS["amber-500"]};
  }

  body {
    font-family: "Roboto Mono", monospace;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
  }

  a {
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background: none;
    border: none;
    font: inherit;
    line-height: normal;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  ul,
  ol {
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1rem;
    font-weight: 400;
  }
`}`;

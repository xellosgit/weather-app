import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

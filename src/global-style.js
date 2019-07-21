import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
    height: 100%;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
    @import url('https://fonts.googleapis.com/css?family=Antic&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Inconsolata&display=swap');
    height: 100%;
  }

  /* main {
    padding-top: 77px;
  } */
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
    /* @import url('https://fonts.googleapis.com/css?family=Antic&display=swap'); */
    @import url('https://fonts.googleapis.com/css?family=Inconsolata&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap');
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    font-size: 14px;
  }

  /* main {
    padding-top: 77px;
  } */
`;

export default GlobalStyle;

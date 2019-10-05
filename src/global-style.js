import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "antd/dist/antd.css";

import "./assets/css/collapse.css";
import "./assets/css/popover.css";
import "./assets/css/tag.css";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
    /* @import url('https://fonts.googleapis.com/css?family=Antic&display=swap'); */
    @import url('https://fonts.googleapis.com/css?family=Inconsolata&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap');
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }

  /* main {
    padding-top: 77px;
  } */
`;

export default GlobalStyle;

import React from "react";
import styled from "styled-components";

import MainHeader from "../../organisms/main-header/main-header";
import MainBoard from "../../organisms/main-board/main-board";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const HeaderArea = styled.nav`
  width: 100%;
  /* height: 8vmin; */
  /* height: 220px; */

  display: flex;
  /* flex-direction: column; */

  z-index: 1000;
`;

const ContentArea = styled.main`
  /* padding-top: 140px; */
  margin-top: 140px;
  width: 100%;

  display: flex;
  flex-direction: column;

  flex-grow: 1;

  z-index: 2;
`;

const MainPage = () => {
  return (
    <Container>
      <HeaderArea>
        <MainHeader />
      </HeaderArea>
      <ContentArea role="main">
        <MainBoard />
      </ContentArea>
    </Container>
  );
};

export default MainPage;

import React from 'react';
import styled from "styled-components"

import MainHeader from '../../organisms/main-header/main-header'

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const HeaderArea = styled.nav`
  width: 100%;
  /* height: 8vmin; */
  height: 120px;
  
  display: flex;
  /* flex-direction: column; */
`;

const ContentArea = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const ArticlesArea = styled.div`
  width: 100%;

  display: flex;
`;

const MainPage = () => {
  return (
    <Container>
      <section>
      <HeaderArea>
        <MainHeader/>
      </HeaderArea>
      <ContentArea role="main">
        <ArticlesArea>
          ArticleArea
          {/* test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
          ArticleArea<br/>
          test<br/>
           */}
          </ArticlesArea>
      </ContentArea>
      </section>
    </Container>
  );
};

export default MainPage;
import React from 'react';
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justity-content: center;
`;

const HeaderArea = styled.div`
  width: 100%;
  // height: 4vh;
  height: 6vmin;

  display: flex;

  position: fixed;

  justity-content: center;
`;

const CategoryArea = styled.div`
  width: 100%;
  // height: 100%; 
  // max-height: 20vmin;

  margin-top: 6vmin;
  min-height: 4vmin;

  display: flex;
  justity-content: center;
`;

const ArticlesArea = styled.div`
  width: 100%;

  display: flex;
  flex-grow: 1;
  justity-content: center;
`;

const MainPage = () => {
  return (
    <Container>
      <HeaderArea>MainHeader</HeaderArea>
      <CategoryArea>CategoryList</CategoryArea>
      <ArticlesArea>ArticleArea</ArticlesArea>
    </Container>
  );
};

export default MainPage;
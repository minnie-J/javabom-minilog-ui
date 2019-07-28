import React from 'react';
import styled from "styled-components"
import { Icon } from 'antd';

const Container = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%; 

  position: fixed;
  /* position: relative; */
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  background: #fff;
  border-bottom: 1px solid #f2f2f2;
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* width: 52.6vw; */
  width: 1010px;
  max-width: 1010px;
  /* min-width: 100vmin; */

  padding: 26px 20px;
`;

const Logo = styled.div`
  display: inline-block;
  user-select: none;

  /* font-family: 'Antic', sans-serif; */
  font-family: 'Inconsolata', monospace;
  font-size: 24px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  background: #fff;
  border-bottom: 1px solid #f2f2f2;
`;

const CategoryArea = styled.div`
  width: 100%;

  display: flex;

  width: 1010px;
  max-width: 1010px;
  /* min-width: 100vmin; */

  padding: 10px 20px;

  align-items: center;
`;

const MainHeader = () => {
  return (
    <Container>
      <HeaderWrapper>
        <HeaderArea>
          <Logo>M I N I L O G</Logo>
          <Icon type="smile" />
        </HeaderArea>
      </HeaderWrapper>
      <CategoryWrapper>
        <CategoryArea>
          <span style={{fontSize: "12px", fontWeight: "300", color: "#333", letterSpacing: '1px'}}>
            Category
          </span>
        </CategoryArea>
      </CategoryWrapper>
    </Container>
  );
};

export default MainHeader;
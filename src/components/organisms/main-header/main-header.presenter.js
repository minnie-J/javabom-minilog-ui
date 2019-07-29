import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Icon, Collapse } from 'antd';
import "./mod-antd.css";

const { Panel } = Collapse;

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
  border-bottom: ${props => props.scroll < 20 && '1px solid #f2f2f2'};

  `;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* width: 52.6vw; */
  width: 1010px;
  max-width: 1010px;
  /* min-width: 100vmin; */
  
  transition: padding .2s ease-in-out;

  /* padding: 26px 20px; */
  padding: ${props => props.scroll < 20 ? '26px 20px' : '10px 20px' };
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

  padding: 0 20px;

  align-items: center;
`;

const MainHeader = () => {

  const [scrollTop, changeScrollTop] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, []);

  const onScroll = () => {
    const scrollTop = ('scroll', document.documentElement.scrollTop);
    changeScrollTop(scrollTop);
  }
  
  const category = (
    <span style={{
      fontSize: "12px", 
      fontWeight: "400", 
      color: "#666", 
      letterSpacing: '1px'}}>
        Category
    </span>)

  return (
    <Container>
      <HeaderWrapper scroll={scrollTop}>
        <HeaderArea scroll={scrollTop}>
          <Logo>M I N I L O G</Logo>
          <Icon type="smile" />
        </HeaderArea>
      </HeaderWrapper>
      <CategoryWrapper>
        <CategoryArea>
          <Collapse bordered={false} expandIconPosition="right" style={{width: "100%"}}>
            <Panel header={category} style={{border: 0}}>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
              <span style={{margin: "0 20px"}}>test</span>
            </Panel>
          </Collapse>
          {/* <span style={{fontSize: "12px", fontWeight: "400", color: "#333", letterSpacing: '1px'}}>
            Category
          </span> */}
        </CategoryArea>
      </CategoryWrapper>
    </Container>
  );
};

export default MainHeader;
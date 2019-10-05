import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon, Collapse, Tag } from "antd";
import "./mod-antd.css";

const { Panel } = Collapse;
const { CheckableTag } = Tag;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  position: fixed;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  background: #fff;
  border-bottom: ${props => props.scroll < 20 && "1px solid #f2f2f2"};
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* width: 52.6vw; */
  width: 1010px;
  max-width: 1010px;
  /* min-width: 100vmin; */

  transition: padding 0.2s ease-in-out;

  /* padding: 26px 20px; */
  padding: ${props => (props.scroll < 20 ? "26px 20px" : "10px 20px")};
`;

const Logo = styled.div`
  display: inline-block;
  user-select: none;

  /* font-family: 'Antic', sans-serif; */
  font-family: "Inconsolata", monospace;
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

const tempCat = [
  "ALL",
  "영화",
  "맛집",
  "여행",
  "책",
  "Develop",
  "일상",
  "Blu-ray",
  "갖고싶다",
  "꿀팁",
  "드라마",
  "예능",
  "아무거나",
  "또뭐없나",
  "카테고리늘리기",
  "힘드네",
  "생각보다",
  "이렇게",
  "카테고리리스트가",
  "많아지지는",
  "않겠다"
];

const MainHeader = () => {
  const [scrollTop, changeScrollTop] = useState(0);
  const [selectedCategory, changeSelectCategory] = useState("ALL");
  const [activePanel, changeActivePanel] = useState("category");

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    const scrollTop = ("scroll", document.documentElement.scrollTop);
    changeScrollTop(scrollTop);
    scrollTop > 20 ? changeActivePanel("") : changeActivePanel("category");
  };

  const category = (
    <div>
      <span
        style={{
          fontSize: "12px",
          fontWeight: "400",
          color: "#666",
          letterSpacing: "1px"
        }}
      >
        Category
      </span>
      &emsp;
      {!activePanel && selectedCategory !== "ALL" && (
        <span
          style={{
            fontSize: "12px",
            color: "#71bdb9",
            display: "inline-block",
            // transitionProperty: "all",
            // transitionDuration: "5s",
            // transitionTimingFunction: "ease-in-out"
            transition: "all .2s"
          }}
        >
          {selectedCategory}
        </span>
      )}
    </div>
  );

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
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <Icon type="left" rotate={isActive ? -90 : 0} />
            )}
            expandIconPosition="right"
            style={{ width: "100%" }}
            activeKey={activePanel}
            onChange={key => {
              activePanel ? changeActivePanel("") : changeActivePanel(key);
            }}
          >
            <Panel header={category} style={{ border: 0 }} key="category">
              {tempCat.map(tag => {
                return (
                  <CheckableTag
                    key={tag}
                    checked={tag === selectedCategory && true}
                    onChange={checked => changeSelectCategory(tag)}
                    style={{ margin: "4px 12px 6px 0" }}
                  >
                    {tag}
                  </CheckableTag>
                );
              })}
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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon, Collapse, Tag, Popover } from "antd";

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
  border-bottom: ${props => props.isActive && "1px solid #f2f2f2"};
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

  padding: ${props => (props.headerState ? "26px 20px" : "10px 20px")};
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

  user-select: none;
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

const CategoryListArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubCategoryArea = styled.div``;

const TEMP_CAT = [
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

const TEMP_SUB_CAT = (
  <div>
    <CheckableTag
      checked={true}
      style={{
        margin: "0 4px",
        width: "max-content"
      }}
    >
      ALL
    </CheckableTag>
    <CheckableTag
      checked={false}
      style={{
        margin: "0 4px",
        width: "max-content"
      }}
    >
      Spring
    </CheckableTag>
    <CheckableTag
      checked={false}
      style={{
        margin: "0 4px",
        width: "max-content"
      }}
    >
      React
    </CheckableTag>
    <CheckableTag
      checked={false}
      style={{
        margin: "0 4px",
        width: "max-content"
      }}
    >
      Etc
    </CheckableTag>
  </div>
);

const MainHeader = () => {
  const [selectedCategory, changeSelectCategory] = useState("ALL");
  const [activePanel, changeActivePanel] = useState("category");

  const [popoverHeight, setPopoverHeight] = useState(0);
  const [windowSize, setWindowSize] = useState(0);
  const [headerState, changeHeaderState] = useState(true);

  useEffect(() => {
    window.onbeforeunload = () => {
      document.documentElement.scrollTop = 0;
    };
    setWindowSize(window.innerWidth);
    window.innerWidth < 600 && changeHeaderState(false);
    window.addEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getPopoverHeight(selectedCategory);
  }, [selectedCategory]);

  const onScroll = () => {
    const currentScrollTop = ("scroll", document.documentElement.scrollTop);
    changeActivePanel("");
    if (currentScrollTop === 0) {
      window.innerWidth > 600 && changeHeaderState(true);
      setTimeout(() => {
        changeActivePanel("category");
      }, window.innerWidth > 600 && 200);
    } else {
      changeActivePanel("");
      changeHeaderState(false);
    }
  };

  const getPopoverHeight = tag => {
    const collection = document.getElementsByClassName(tag);
    const array = Array.from(collection);
    array.map(el => {
      console.log("el ", el.clientHeight);
      setPopoverHeight(el.clientHeight);
    });
  };

  const CATEGORY_HEADER = (
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
      {!activePanel && (
        <span
          style={{
            fontSize: "12px",
            color: "#71bdb9"
          }}
        >
          {selectedCategory}
        </span>
      )}
    </div>
  );

  return (
    <Container>
      <HeaderWrapper isActive={activePanel ? true : false}>
        <HeaderArea headerState={headerState}>
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
              if (activePanel) {
                changeActivePanel("");
                changeHeaderState(false);
              } else {
                windowSize > 600 && changeHeaderState(true);
                setTimeout(() => {
                  changeActivePanel("category");
                }, windowSize > 600 && 400);
              }
            }}
          >
            <Panel
              header={CATEGORY_HEADER}
              style={{ border: 0 }}
              key="category"
            >
              <CategoryListArea>
                {TEMP_CAT.map(tag => {
                  return (
                    <CategoryItem key={tag}>
                      <CheckableTag
                        checked={tag === selectedCategory && true}
                        onChange={checked => changeSelectCategory(tag)}
                        style={{
                          margin: "4px 12px 6px 0",
                          width: "max-content"
                        }}
                      >
                        <Popover
                          // key={tag}
                          placement="bottom"
                          content={
                            tag === "Develop" &&
                            tag === selectedCategory &&
                            tag !== "ALL" &&
                            activePanel
                              ? TEMP_SUB_CAT
                              : ""
                          }
                          trigger="click"
                          visible={true}
                          overlayStyle={{
                            userSelect: "none",
                            visibility:
                              tag === "Develop" &&
                              tag === selectedCategory &&
                              tag !== "ALL" &&
                              activePanel
                                ? "visible"
                                : "hidden",
                            transition: "visibility 0.2s ease-in-out",
                            // transitionDelay: "0.1s",
                            position: "fixed"
                          }}
                          overlayClassName={tag}
                        >
                          {tag}
                        </Popover>
                      </CheckableTag>
                      {tag === "Develop" && (
                        <SubCategoryArea
                          style={{
                            height:
                              tag === selectedCategory && tag !== "ALL"
                                ? `${popoverHeight}px`
                                : `0px`,
                            transition: "height 0.3s ease-out"
                          }}
                        />
                      )}
                    </CategoryItem>
                  );
                })}
              </CategoryListArea>
            </Panel>
          </Collapse>
        </CategoryArea>
      </CategoryWrapper>
    </Container>
  );
};

export default MainHeader;

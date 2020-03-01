import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";

import { Icon, Collapse, Tag, Popover } from "antd";
import { openArticleEditor } from "../../organisms/article-editor/article-editor";

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

const SubCategoryArea = styled.div`
  height: ${props => props.height};

  /* transition: height 0.3s ease-out; */
`;

const CategoryHeaderLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #666;
  letter-spacing: 1px;
`;

const SelectedCategory = styled.span`
  font-size: 12px;
  color: #71bdb9;
`;

const TEMP_CAT = [
  { name: "ALL", id: 0 },
  { name: "영화", id: 1 },
  { name: "맛집", id: 2 },
  { name: "여행", id: 3 },
  { name: "책", id: 4 },
  { name: "Develop", id: 5 },
  { name: "일상", id: 6 },
  { name: "Blu-ray", id: 7 },
  { name: "갖고싶다", id: 8 },
  { name: "꿀팁", id: 9 },
  { name: "드라마", id: 10 },
  { name: "예능", id: 11 },
  { name: "아무거나", id: 12 },
  { name: "또뭐없나", id: 13 },
  { name: "카테고리늘리기", id: 14 },
  { name: "힘드네", id: 15 },
  { name: "생각보다", id: 16 },
  { name: "이렇게", id: 17 },
  { name: "카테고리리스트가", id: 18 },
  { name: "많아지지는", id: 19 },
  { name: "않겠다", id: 20 }
];

const TEMP_SUB_CAT = {
  5: ["ALL", "React", "Spring"],
  1: [
    "ALL",
    "인생영화",
    "평작",
    "최악",
    "Blu-lay Collection",
    "카테고리늘리기",
    "테스트",
    "멀티플",
    "선택이",
    "필요하네",
    "2차카테고리는"
  ],
  20: ["ALL", "test", "etc"]
};

const MainHeader = () => {
  const [selectedCategory, changeSelectCategory] = useState("ALL");
  const [activePanel, changeActivePanel] = useState("category");
  const [currentSubcat, changeCurrentSubcat] = useState("ALL");

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
    const collection = document.getElementsByClassName(selectedCategory);
    const array = Array.from(collection);
    array.map(el => {
      // console.log("el ", el);
      setPopoverHeight(el.clientHeight);
    });
    changeCurrentSubcat("ALL");
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

  const CategoryHeader = (
    <Fragment>
      <CategoryHeaderLabel>Category</CategoryHeaderLabel>
      &emsp;
      {!activePanel && (
        <SelectedCategory>
          {currentSubcat !== "ALL" && currentSubcat}&emsp;{selectedCategory}
        </SelectedCategory>
      )}
    </Fragment>
  );

  return (
    <Container>
      <HeaderWrapper isActive={activePanel ? true : false}>
        <HeaderArea headerState={headerState}>
          <Logo>M I N I L O G</Logo>
          <Icon type="smile" onClick={() => openArticleEditor()} />
        </HeaderArea>
      </HeaderWrapper>
      <CategoryWrapper>
        <CategoryArea>
          <Collapse
            className="header"
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
              header={CategoryHeader}
              style={{ border: 0 }}
              key="category"
              className="header"
            >
              <CategoryListArea id="category-area">
                {TEMP_CAT.map(cat => {
                  return (
                    <CategoryItem key={cat.id}>
                      <CheckableTag
                        checked={cat.name === selectedCategory && true}
                        onChange={checked => changeSelectCategory(cat.name)}
                        style={{
                          margin: "4px 12px 6px 0",
                          width: "max-content"
                        }}
                      >
                        <Popover
                          // key={tag}
                          getPopupContainer={() =>
                            document.getElementById("category-area")
                          }
                          placement="bottom"
                          arrowPointAtCenter
                          content={
                            TEMP_SUB_CAT[cat.id]
                              ? TEMP_SUB_CAT[cat.id].map(subcat => {
                                  return (
                                    <CheckableTag
                                      key={subcat}
                                      checked={
                                        currentSubcat === subcat ? true : false
                                      }
                                      onChange={checked =>
                                        changeCurrentSubcat(subcat)
                                      }
                                      style={{
                                        margin: "0 4px 2px 4px",
                                        width: "max-content"
                                      }}
                                    >
                                      {subcat}
                                    </CheckableTag>
                                  );
                                })
                              : ""
                          }
                          trigger="click"
                          visible={true}
                          overlayStyle={{
                            maxWidth:
                              windowSize > 1136
                                ? "400px"
                                : windowSize > 500
                                ? `${windowSize / 4}px`
                                : `${(windowSize / 5) * 3}px`,
                            userSelect: "none",
                            visibility:
                              TEMP_SUB_CAT[cat.id] &&
                              cat.name === selectedCategory &&
                              activePanel
                                ? "visible"
                                : "hidden",
                            opacity:
                              TEMP_SUB_CAT[cat.id] &&
                              cat.name === selectedCategory &&
                              activePanel
                                ? "1"
                                : "0",
                            // transition: "visibility 0.1s ease-in-out",
                            transition: "opacity 0.3s, visibility 0.2s ",
                            // transitionDelay: "0.1s",
                            position: "fixed"
                          }}
                          overlayClassName={cat.name}
                        >
                          {cat.name}
                        </Popover>
                      </CheckableTag>
                      {TEMP_SUB_CAT[cat.id] && (
                        <SubCategoryArea
                          height={
                            cat.name === selectedCategory
                              ? `${popoverHeight}px`
                              : `0px`
                          }
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

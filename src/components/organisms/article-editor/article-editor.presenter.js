import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";
import "../../../assets/css/react-mde.css";

import PopupFull from "../../molecules/popup-full/popup-full";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const TopArea = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
`;

const ImageUploadArea = styled.div`
  display: flex;
  flex-grow: 1;
`;

const InputArea = styled.div`
  display: flex;
  flex-grow: 1;
`;

const CenterArea = styled.div`
  height: 100%;

  display: flex;
  flex-grow: 1;
`;

const BottomArea = styled.div`
  display: flex;
`;

const ArticleEditor = ({ onClickClose }) => {
  const [value, setValue] = useState("Hello, World");
  const [selectedTab, setSelectedTab] = useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  return (
    <PopupFull title="New Article" onClickClose={onClickClose}>
      <Container>
        <TopArea>
          <ImageUploadArea>이미지업로드 영역</ImageUploadArea>
          <InputArea>
            Select 영역
            {/* <PublicToggleArea></PublicToggleArea>
            <CategorySelectArea></CategorySelectArea>
            <FiltersSelectArea></FiltersSelectArea>
            <TitleArea></TitleArea>
            <DescArea></DescArea>
            <KeywordArea></KeywordArea>
            <DateSelectArea></DateSelectArea>
            <PeopleInputArea></PeopleInputArea> */}
          </InputArea>
        </TopArea>
        <CenterArea>
          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </CenterArea>
        <BottomArea>Save 버튼 영역</BottomArea>
      </Container>
    </PopupFull>
  );
};

ArticleEditor.defaultProps = {};

ArticleEditor.propTypes = {};

export default ArticleEditor;

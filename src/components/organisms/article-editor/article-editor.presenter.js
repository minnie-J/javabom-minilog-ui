import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.min.css";
import "tui-editor/dist/tui-editor-contents.min.css";
import { Editor } from "@toast-ui/react-editor";

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
  // const [value, setValue] = useState("Hello, World");
  // const [selectedTab, setSelectedTab] = useState("write");

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
          <Editor
            initialValue="에디터 테스트"
            initialEditType="markdown"
            previewStyle="tab"
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

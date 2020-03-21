import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

/**
 * toast-ui editor - 필수
 */
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.min.css";
import "tui-editor/dist/tui-editor-contents.min.css";
import { Editor } from "@toast-ui/react-editor";

/**
 * toast-ui edtior plugin - code syntax highlight
 * 코드 입력시 코드 에디터처럼 컬러 표현
 */
import "highlight.js/styles/github.css";
import highlight from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

/**
 * tast-ui editor plugin - color syntax
 * 글자색 변경
 */
import "tui-color-picker/dist/tui-color-picker.css";
import "../../../assets/css/colorpicker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import {
  BackDrop,
  Container,
  Wrapper,
  HeaderArea,
  PopupTitle,
  ContentArea,
  EditorContainer,
  ArticleMetaArea,
  EditorArea,
  MetaContainer,
  SaveIcon
} from "./popup-article-editor.style";

const PopupArticleEditor = ({
  scrollTop,
  isOwner,
  isEditMode,
  title,
  content,
  onSave,
  onClose
}) => {
  return (
    <BackDrop scrollTop={scrollTop}>
      <Container>
        <Wrapper>
          <HeaderArea>
            <PopupTitle title={title}>{title}</PopupTitle>
            {isOwner && <Icon type="edit" />}
            {isOwner && <Icon type="delete" />}
            {isEditMode && (
              <SaveIcon type="save" theme="filled" onClick={onSave} />
            )}
            <Icon
              type="plus"
              style={{ fontSize: "1.6rem", cursor: "pointer" }}
              rotate={45}
              onClick={onClose}
            />
          </HeaderArea>
          <ContentArea>
            {isEditMode ? (
              <EditorContainer>
                <ArticleMetaArea>
                  <MetaContainer>메타 왼쪽</MetaContainer>
                  <MetaContainer>메타 오른쪽</MetaContainer>
                </ArticleMetaArea>
                <EditorArea>
                  <Editor
                    initialValue="에디터 테스트"
                    initialEditType="markdown"
                    previewStyle="tab"
                    height="100%"
                    useCommandShortcut={true}
                    plugins={[
                      colorSyntax,
                      [codeSyntaxHighlight, { highlight }]
                    ]}
                  />
                </EditorArea>
              </EditorContainer>
            ) : (
              <div>ArticleViewer 영역</div>
            )}
          </ContentArea>
        </Wrapper>
      </Container>
    </BackDrop>
  );
};

PopupArticleEditor.defaultProps = {
  scrollTop: 0,
  isOwner: false,
  isEditMode: false,
  title: null,
  content: null,
  onSave: () => {},
  onClose: () => {}
};

PopupArticleEditor.propTypes = {
  scrollTop: PropTypes.number,
  isOwner: PropTypes.bool,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func
};

export default PopupArticleEditor;

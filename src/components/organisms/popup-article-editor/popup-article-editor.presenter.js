import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Input, DatePicker, TimePicker, Select, Divider } from "antd";
import {
  PlusOutlined,
  TagsOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

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
  EditIcon,
  DeleteIcon,
  SaveIcon,
} from "./popup-article-editor.style";

const PopupArticleEditor = ({
  scrollTop,
  isOwner,
  isEditMode,
  categories,
  title,
  content,
  newCategoryName,
  onChangeNewCategoryName,
  onClickAddNewCategory,
  onSave,
  onClose,
}) => {
  return (
    <BackDrop scrollTop={scrollTop}>
      <Container>
        <Wrapper>
          <HeaderArea>
            <PopupTitle title={title}>{title}</PopupTitle>
            {!isEditMode && isOwner && (
              <Fragment>
                <EditIcon />
                <DeleteIcon />
              </Fragment>
            )}
            {isEditMode && <SaveIcon onClick={onSave} />}
            <PlusOutlined
              style={{ fontSize: "1.6rem", cursor: "pointer" }}
              rotate={45}
              onClick={onClose}
            />
          </HeaderArea>
          <ContentArea>
            {isEditMode ? (
              <EditorContainer>
                <ArticleMetaArea>
                  <MetaContainer>
                    <Select
                      placeholder="Select Category"
                      dropdownRender={(menu) => (
                        <div>
                          {menu}
                          <Divider style={{ margin: "4px 0" }} />
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "nowrap",
                              padding: 8,
                            }}
                          >
                            <Input
                              style={{ flex: "auto" }}
                              value={newCategoryName}
                              onChange={(event) =>
                                onChangeNewCategoryName(event.target.value)
                              }
                            />
                            <div
                              style={{
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                              }}
                              onClick={onClickAddNewCategory}
                            >
                              + 카테고리추가
                            </div>
                          </div>
                        </div>
                      )}
                    >
                      {categories &&
                        categories.map((category) => (
                          <Select.Option key={category}>
                            {category}
                          </Select.Option>
                        ))}
                    </Select>
                  </MetaContainer>
                  <MetaContainer>
                    <Input placeholder="제목" />
                    <Input.TextArea
                      placeholder="Description"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                    <div style={{ display: "inline-flex" }}>
                      <TagsOutlined />
                    </div>
                    <div style={{ display: "inline-flex" }}>
                      <UserOutlined />
                    </div>
                    <div style={{ display: "inline-flex" }}>
                      <EnvironmentOutlined />
                    </div>
                    <div style={{ display: "inline-flex" }}>
                      <DatePicker />
                      <TimePicker use12Hours format="h:mm A" />
                      <Input placeholder="ex. 매주 월요일" />
                    </div>
                    <DatePicker.RangePicker />
                    <div>타임라인 추가(여행 카테고리일때 등등)</div>
                  </MetaContainer>
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
                      [codeSyntaxHighlight, { highlight }],
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
  onClose: () => {},
};

PopupArticleEditor.propTypes = {
  scrollTop: PropTypes.number,
  isOwner: PropTypes.bool,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default PopupArticleEditor;

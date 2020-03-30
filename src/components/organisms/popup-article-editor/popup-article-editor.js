import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { withErrorBoundary } from "../../../hocs";

import PopupArticleEditorPresenter from "./popup-article-editor.presenter";

let PopupArticleEditor = ({ isOwner, payload, onClose }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [isEditMode, changeIsEditMode] = useState(true);

  const title = payload ? "Read Article" : "New Article";
  const content = payload ? "Content Area" : null;
  // content,
  // tempInfo,
  // onEdit,
  // onDelete,
  // onSave,
  // onClose

  const onSave = () => changeIsEditMode(false);

  useEffect(() => {
    setScrollTop(document.documentElement.scrollTop);

    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <PopupArticleEditorPresenter
      scrollTop={scrollTop}
      isOwner={isOwner}
      isEditMode={isEditMode}
      title={title}
      content={content}
      onSave={onSave}
      onClose={onClose}
    />
  );
};

PopupArticleEditor.defaultProps = {
  isOwner: false,
  payload: null,
  onClose: () => {}
};

PopupArticleEditor.propTypes = {
  isOwner: PropTypes.bool,
  payload: PropTypes.shape({
    articleId: PropTypes.number,
    content: PropTypes.object
  }),
  onClose: PropTypes.func
};

PopupArticleEditor = withErrorBoundary(PopupArticleEditor);

export const openPopupArticleEditor = ({ isOwner, payload }) => {
  const wrapper = document.body.appendChild(document.createElement("div"));

  return new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <PopupArticleEditor
          isOwner={isOwner}
          payload={payload}
          onClose={() => resolve(null)}
        />,
        wrapper
      );
    } catch {
      reject("팝업 불러오기 실패.");
    }
  }).then(result => {
    ReactDOM.unmountComponentAtNode(wrapper);
    wrapper.remove();

    return result;
  });
};

export default PopupArticleEditor;

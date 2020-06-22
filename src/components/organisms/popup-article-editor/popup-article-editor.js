import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { withErrorBoundary } from "../../../hocs";

import PopupArticleEditorPresenter from "./popup-article-editor.presenter";

let PopupArticleEditor = ({ isOwner, payload, onClose }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [isEditMode, changeIsEditMode] = useState(true);

  const [categories, setCategories] = useState(["영화", "여행", "Develop"]);
  const [newCategoryName, changeNewCategoryName] = useState("");

  const [subCategories, setSubCategories] = useState([
    "test1",
    "test2",
    "test3",
  ]);

  const [thisCategory, changeThisCategory] = useState("");
  const [thisSubCats, changeThisSubCats] = useState([]);

  const title = payload ? "Read Article" : "New Article";
  const content = payload ? "Content Area" : null;
  // content,
  // tempInfo,
  // onEdit,
  // onDelete,
  // onSave,
  // onClose

  const onChangeNewCategoryName = (name) => changeNewCategoryName(name);

  const onClickAddNewCategory = (event) => {
    if (!newCategoryName) return;
    setCategories([...categories, newCategoryName]);
    changeNewCategoryName("");
  };

  const onSelectCategory = (name) => changeThisCategory(name);

  const onChangeNewSubCatName = (cats) => changeThisSubCats(cats);

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
      categories={categories}
      subCategories={subCategories}
      title={title}
      content={content}
      newCategoryName={newCategoryName}
      onChangeNewCategoryName={onChangeNewCategoryName}
      onClickAddNewCategory={onClickAddNewCategory}
      onSelectCategory={onSelectCategory}
      onChangeNewSubCatName={onChangeNewSubCatName}
      onSave={onSave}
      onClose={onClose}
    />
  );
};

PopupArticleEditor.defaultProps = {
  isOwner: false,
  payload: null,
  onClose: () => {},
};

PopupArticleEditor.propTypes = {
  isOwner: PropTypes.bool,
  payload: PropTypes.shape({
    articleId: PropTypes.number,
    content: PropTypes.object,
  }),
  onClose: PropTypes.func,
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
  }).then((result) => {
    ReactDOM.unmountComponentAtNode(wrapper);
    wrapper.remove();

    return result;
  });
};

export default PopupArticleEditor;

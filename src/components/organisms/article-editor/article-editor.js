import React from "react";
import ReactDOM from "react-dom";

import { withErrorBoundary } from "../../../hocs";

import ArticleEditorPresenter from "./article-editor.presenter";

const ArticleEditor = withErrorBoundary(ArticleEditorPresenter);

export const openArticleEditor = () => {
  const wrapper = document.body.appendChild(document.createElement("div"));

  return new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <ArticleEditor onClickClose={() => resolve(null)} />,
        wrapper
      );
    } catch {
      reject("Failed to mount popup component");
    }
  }).then(result => {
    ReactDOM.unmountComponentAtNode(wrapper);
    wrapper && wrapper.remove();

    return result;
  });
};

export default ArticleEditor;

import React from "react";
import ReactDOM from "react-dom";

import { withErrorBoundary } from "../../../hocs";

import PopupFullPresenter from "./popup-full.presenter";

const PopupFull = withErrorBoundary(PopupFullPresenter);

export const openPopupFull = (title, content) => {
  const wrapper = document.body.appendChild(document.createElement("div"));

  return new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <PopupFull
          title={title}
          onClickClose={() => resolve(null)}
        >
          {content}
        </PopupFull>,
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

export default PopupFull;

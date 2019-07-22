// import { withErrorBoundary } from "./hocs";
import {bindActionCreators} from "redux";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

import {init} from "./ducks/modules/articles"

import AppPresenter from "./app.presenter";

const mapDispatchToProps = dispatch => ({
  initArticlesReducer: bindActionCreators(init, dispatch)
})

// const App = withErrorBoundary(AppPresenter);

const App = withRouter(
  connect(
    null, 
    mapDispatchToProps
  )(AppPresenter)
)

export default App;

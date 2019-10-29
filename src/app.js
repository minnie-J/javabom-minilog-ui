import { withErrorBoundary } from "./hocs";

import AppPresenter from "./app.presenter";

const App = withErrorBoundary(AppPresenter);

// const App = withRouter(
//   connect(
//     null,
//     mapDispatchToProps
//   )(AppPresenter)
// )

export default App;

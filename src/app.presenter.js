import React, {useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom"

import {PAGES} from "./assets/js/consts"

import MainPage from "./components/pages/main-page/main-page"

// const App = () => <div>Hello React</div>;

const App = ({initArticlesReducer}) => {
  useEffect(() => {
    initArticlesReducer();
  }, []);

  return (
    <Switch>
      <Route path={PAGES.byId.ARTICLES.path} component={MainPage} />
      {/* <Route path={PAGES.byId.DASHBOARD.path} component={DashboardPage} /> */}
      <Route path="/" render={() => <Redirect to={PAGES.byId.ARTICLES.path}/>}/>
    </Switch>
  )
}

export default App;

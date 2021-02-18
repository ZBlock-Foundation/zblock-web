import React from "react";
import { useImmerReducer } from "use-immer";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppDispatchContext from "../context/AppDispatchContext";
import AppStateContext from "../context/AppStateContext";
import { appInitialState, appReducer } from "../reducers/appReducer";

// Components
import AppMain from "./app/AppMain";
import LandingMain from "./landing-page/LandingMain";
import FlashMessages from "./utils/FlashMessages";

const App = () => {
  const [state, dispatch] = useImmerReducer(appReducer, appInitialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Switch>
            <Route path="/" exact>
              <LandingMain />
            </Route>
            <Route path="/app">
              <AppMain />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import MessageTypes from "../../utils/messageTypesUtils";

// Components
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import CommunityList from "./CommunityList";
import Home from "./Home";
import CreateCommunity from "./CreateCommunity";
import CommunityDetail from "./CommunityDetail";

// UI Components
import "antd/dist/antd.css";
import "./css/AppStyles.css";

const AppMain = () => {
  return (
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route path="/app" exact>
          <Home />
        </Route>
        <Route path="/app/communities">
          <CommunityList />
        </Route>
        <Route path="/app/community/:id/detail">
          <CommunityDetail />
        </Route>
        <Route path="/app/create-community">
          <CreateCommunity />
        </Route>
      </Switch>
      <AppFooter />
    </React.Fragment>
  );
};

export default AppMain;

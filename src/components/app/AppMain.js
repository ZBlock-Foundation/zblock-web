import React from "react";
import { Route, Switch } from "react-router-dom";
import MessageTypes from "../../utils/messageTypesUtils";

// Components
import AppFooter from "./home/AppFooter";
import AppHeader from "./home/AppHeader";
import CommunityList from "./community-list/CommunityList";
import Home from "./home/Home";
import CreateCommunity from "./community-create/CreateCommunity";
import CommunityDetail from "./community-detail/CommunityDetail";

// UI Components
import "antd/dist/antd.css";
import "./styles/AppStyles.css";

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

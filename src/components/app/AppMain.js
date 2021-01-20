import React from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import FlashMessages from "../utils/FlashMessages";
import MessageTypes from "../../utils/messageTypes";

// UI Components
import "antd/dist/antd.css";
import "./css/Styles.css";

const AppMain = () => {
  const messages = [{ type: MessageTypes.ERROR, message: "invalid value" }];

  return (
    <div>
      <AppHeader />
      <LoadingSpinner />
      <FlashMessages messages={messages} />
      <AppFooter />
    </div>
  );
};

export default AppMain;

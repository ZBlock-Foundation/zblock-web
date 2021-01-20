import React from "react";
import { message } from "antd";
import MessageTypes from "../../utils/messageTypes";

const FlashMessages = (props) => {
  const messages = props.messages.map((msg, _) => {
    switch (msg.type) {
      case MessageTypes.SUCCESS:
        return message.success(msg.message);
      case MessageTypes.WARNING:
        return message.warning(msg.message);
      case MessageTypes.INFO:
        return message.info(msg.message);
      case MessageTypes.ERROR:
        return message.error(msg.message);
      default:
        return message.warn(msg.message);
    }
  });

  return <React.Fragment>{messages}</React.Fragment>;
};

export default FlashMessages;

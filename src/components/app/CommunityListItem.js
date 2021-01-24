import React, { useEffect } from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const CommunityListItem = ({ community }) => {
  return (
    <Card
      style={{ width: 400 }}
      cover={
        <img
          alt="example"
          src={community.images[0]}
          style={{ width: "400px", height: "300px" }}
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta title={community.name} description={community.description} />
    </Card>
  );
};

export default CommunityListItem;

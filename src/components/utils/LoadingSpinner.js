import React from "react";
import { Spin, Space } from "antd";

const LoadingSpinner = () => {
  return (
    <Space size="large">
      <Spin size="large" />
    </Space>
  );
};

export default LoadingSpinner;

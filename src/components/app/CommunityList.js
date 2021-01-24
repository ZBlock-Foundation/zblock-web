import React, { useEffect } from "react";
import { Card, Col, Row } from "antd";

import data from "../../mock-data/data.json";
import CommunityListItem from "./CommunityListItem";

const CommunityList = () => {
  const communityList = () => {
    const chunkedCommunities = Array.from(
      { length: Math.ceil(data.communities.length / 3) },
      (v, i) => data.communities.slice(i * 3, i * 3 + 3)
    );

    const rows = chunkedCommunities.map((chunkedCommunity, index) => {
      const cols = chunkedCommunity.map((community, index) => {
        return (
          <Col span={8}>
            <CommunityListItem key={index} community={community} />
          </Col>
        );
      });
      return (
        <Row style={{ margin: "30px", alignItems: "center" }} key={index}>
          {cols}
        </Row>
      );
    });
    return rows;
  };

  return (
    <div className="site-card-wrapper">
      <div style={{ marginLeft: "30px" }}>Communities</div>
      <Card
        style={{
          padding: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {communityList()}
      </Card>
    </div>
  );
};

export default CommunityList;

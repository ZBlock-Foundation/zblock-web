import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/LoadingSpinner";
import {
  Col,
  Row,
  Statistic,
  Button,
  Descriptions,
  Card,
  Carousel,
  Image,
} from "antd";
import {
  SettingOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  BankOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import data from "../../../mock-data/data.json";

const CommunityDetail = () => {
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    setCommunity(data.communities[0]);
  }, []);

  if (community === null) {
    return <LoadingSpinner />;
  }

  const getAmount = (community) => {
    const sum = community.participants
      .map((v) => v.amount)
      .reduce((sum, current) => sum + current, 0);
    return sum;
  };

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div className="site-statistic-demo-card">
        <Row>
          <Descriptions title={community.name}>
            <Descriptions.Item label="Description">
              {community.description}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {`${community.address}, ${community.city}/${community.country}`}
            </Descriptions.Item>
            <Descriptions.Item label="">
              <div style={{ width: "100px", marginLeft: "80%" }}>
                <Button
                  block={true}
                  type={"primary"}
                  size={"large"}
                  style={{ backgroundColor: "#e67e22", borderColor: "orange" }}
                >
                  Join
                </Button>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card className="community-detail-card">
              <Statistic
                prefix={<FieldTimeOutlined />}
                title="Date"
                value={new Date(community.date).toDateString()}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="community-detail-card">
              <Statistic
                title="Status"
                value={community.status}
                prefix={<SettingOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="community-detail-card">
              <Statistic
                prefix={<HomeOutlined />}
                title="Community Type"
                value={community.communityType}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="community-detail-card">
              <Statistic
                title="Community Purpose"
                prefix={<TagsOutlined />}
                value={community.communityPurpose
                  .map((p) => p[0].toUpperCase() + p.substring(1))
                  .join(", ")}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card className="community-detail-card">
              <Statistic
                title="Participants"
                prefix={<UsergroupAddOutlined />}
                value={community.participants.length}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="community-detail-card">
              <Statistic
                prefix={<BankOutlined />}
                title="Fund Raised"
                value={getAmount(community) + ` of ${community.fundGoal}`}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <Row gutter={16} style={{ marginTop: "10px" }}>
        <Col span={3}></Col>
        <Col span={18}>
          <Carousel effect={"fade"} autoplay={true}>
            {community.images.map((i) => (
              <Image height={600} src={i} />
            ))}
          </Carousel>
        </Col>
        <Col span={3}></Col>
      </Row>
    </>
  );
};

export default CommunityDetail;

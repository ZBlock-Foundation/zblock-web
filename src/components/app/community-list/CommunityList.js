import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Web3 from "web3";
import { ZBlock, address } from "../../../abi/zblock";

import CommunityListItem from "./CommunityListItem";

// Defining ZBlock Smart Contract
const web3 = new Web3(Web3.givenProvider);
const zBlockContract = new web3.eth.Contract(ZBlock, address);

const CommunityList = () => {
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    try {
      const callContract = async () => {
        const communities = await zBlockContract.methods.communityList().call();
        setCommunityList(communities);
      };
      callContract();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const renderCommunityList = () => {
    const chunkedCommunities = Array.from(
      { length: Math.ceil(communityList.length / 3) },
      (v, i) => communityList.slice(i * 3, i * 3 + 3)
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
        {renderCommunityList()}
      </Card>
    </div>
  );
};

export default CommunityList;

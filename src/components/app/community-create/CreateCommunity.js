import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Tag,
  Button,
  Steps,
  Divider,
  Row,
  Col,
  Slider,
  InputNumber,
  Radio,
} from "antd";
import { getAllCountries, getStatesOfCountry } from "../../../api/countriesAPI";
import uuid from "uuid-random";
import Web3 from "web3";
import { ZBlock, address } from "../../../abi/zblock";

// Defining ZBlock Smart Contract
const web3 = new Web3(Web3.givenProvider);
const zBlockContract = new web3.eth.Contract(ZBlock, address);

const communityPurposeOptions = [
  { color: "gold", value: "permaculture" },
  { color: "lime", value: "vegan" },
  { color: "green", value: "eco-friendly" },
  { color: "cyan", value: "religious" },
  { color: "orange", value: "self-sufficient" },
  { color: "purple", value: "antispecist" },
  { color: "brown", value: "political" },
];

const communityPurposeColorMap = {
  permaculture: "gold",
  vegan: "lime",
  "eco-friendly": "green",
  religious: "cyan",
  "self-sufficient": "orange",
  antispecist: "purple",
  political: "brown",
};

const communityPurposeValueMap = {
  permaculture: 0,
  vegan: 1,
  "eco-friendly": 2,
  religious: 3,
  "self-sufficient": 4,
  antispecist: 5,
  political: 6,
};

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const CreateCommunity = (props) => {
  // Community Details
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [website, setWebsite] = useState(null);
  const [founderName, setFounderName] = useState(null);
  const [founderEmail, setFounderEmail] = useState(null);
  const [founderPhone, setFounderPhone] = useState(null);

  // Community Type&Purpose
  const [type, setType] = useState(0);
  const [purposes, setPurposes] = useState([]);

  // Community Location
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [addressDetail, setAddressDetail] = useState(null);

  // Community Fund Locking&Releasing
  const [minLockingPeriod, setMinLockingPeriod] = useState(3);
  const [maxLockingPeriod, setMaxLockingPeriod] = useState(3);
  const [targetAmount, setTargetAmount] = useState(0);
  const [releaseFund, setReleaseFund] = useState(0);
  const [securityManager, setSecurityManager] = useState(null);
  const [securityManagers, setSecurityManagers] = useState([
    "0xdD5625F35B98D94Aa1A38dc170A2d06283A81830",
    "0xD92F1DE3a33db86Df6b3834A742116BACE66830F",
    "0xf9FA39ea483AC14cC4A83127B067EFF719c8898F",
  ]);

  // handle form submit
  const handleFormSubmit = async (values) => {
    // Community Detail
    const communityDetail = {
      id: uuid(),
      name: name,
      description: description,
      website: website,
      founderName: founderName,
      founderEmail: founderEmail,
      founderPhone: founderPhone,
    };

    // Community Type&Purpose
    const communityType = type;
    const communityPurposes = purposes.map((v) => communityPurposeValueMap[v]);

    // Community Address
    const communityAddress = {
      country: selectedCountry,
      city: selectedCity,
      addressDetail: addressDetail,
    };

    // Commuinity Fund Locking&Releasing
    const communityFundLocking = {
      minLockingDate: minLockingPeriod,
      maxLockingDate: maxLockingPeriod,
    };

    const communityFundReleasing = {
      targetAmount: targetAmount,
      releaseFund: releaseFund,
      securityManager: securityManager,
    };

    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const communityInfo = {
      founder: account,
      detail: communityDetail,
      typeInfo: communityType,
      purposes: communityPurposes,
      addressInfo: communityAddress,
      fundLocking: communityFundLocking,
      fundReleasing: communityFundReleasing,
    };

    try {
      const gas = await zBlockContract.methods
        .newCommunity(communityInfo)
        .estimateGas();

      const response = await zBlockContract.methods
        .newCommunity(communityInfo)
        .send({ from: account, gas });
      props.history.push("/app/communities");
    } catch (e) {
      console.log(e);
    }
  };

  // Steps
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    try {
      setCountries(getAllCountries());
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (selectedCountry === null) {
      return;
    }

    const setCityList = async () => {
      try {
        const cityList = await getStatesOfCountry(selectedCountry);
        setCities(cityList);
        setSelectedCity(null);
      } catch (e) {
        console.log(e);
      }
    };
    setCityList();
  }, [selectedCountry]);

  const communityPurposeTagsRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color={communityPurposeColorMap[value]}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const countrySelectOptions = () => {
    return countries.map((country, index) => {
      return (
        <Select.Option key={index} value={country.isoCode}>
          {country.flag} {country.name}
        </Select.Option>
      );
    });
  };

  const citySelectOptions = () => {
    return cities.map((city, index) => {
      return (
        <Select.Option key={index} value={city.isoCode}>
          {city.name}
        </Select.Option>
      );
    });
  };

  return (
    <React.Fragment>
      <h4 style={{ marginLeft: 10 }}>Create New Community</h4>
      <Divider />

      <Row gutter={16}>
        <Col span={2}></Col>
        <Col span={20}>
          <Steps current={stepIndex}>
            <Steps.Step key={0} title={"Details"} />
            <Steps.Step key={1} title={"Type & Purpose"} />
            <Steps.Step key={2} title={"Location"} />
            <Steps.Step key={3} title={"Fund Locking & Releasing"} />
            <Steps.Step key={4} title={"Overview"} />
          </Steps>
        </Col>
        <Col span={2}></Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} style={{ marginTop: 20 }}>
          <Form {...layout} layout="horizontal" onFinish={handleFormSubmit}>
            {stepIndex === 0 && (
              <div style={{ marginTop: 20 }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Name" required={true}>
                      <Input
                        placeholder="Community Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Description" required={true}>
                      <Input.TextArea
                        placeholder="Community Description"
                        rows={10}
                        minLength={10}
                        maxLength={500}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Website">
                      <Input
                        placeholder="Community Website(if available)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Founder Name" required={true}>
                      <Input
                        placeholder="Community's Founder Name"
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Founder Email"
                      required={true}
                      rules={[{ type: "email" }]}
                    >
                      <Input
                        placeholder="Community's Founder Email"
                        value={founderEmail}
                        onChange={(e) => setFounderEmail(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Founder Phone" required={true}>
                      <Input
                        placeholder="Community's Founder Phone Number"
                        value={founderPhone}
                        onChange={(e) => setFounderPhone(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}

            {stepIndex === 1 && (
              <div style={{ marginLeft: "20%" }}>
                <Col span={18}>
                  <Form.Item label="Community Type" required={true}>
                    <Select
                      showSearch
                      placeholder="Select Community Type"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(value) => setType(value)}
                    >
                      <Select.Option value="0">Eco-Village</Select.Option>
                      <Select.Option value="1">Co-Housing</Select.Option>
                      <Select.Option value="2">Income Sharing</Select.Option>
                      <Select.Option value="3">Shared House</Select.Option>
                      <Select.Option value="4">Shared Flat</Select.Option>
                      <Select.Option value="5">Homestead</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label="Community Purpose" required={true}>
                    <Select
                      mode="multiple"
                      showArrow={true}
                      placeholder={"Select Community Purpose Tags"}
                      tagRender={communityPurposeTagsRender}
                      options={communityPurposeOptions}
                      onChange={(value) => {
                        setPurposes(value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 2 && (
              <div style={{ marginLeft: "20%" }}>
                <Col span={18}>
                  <Form.Item label="Country" required={true}>
                    <Select
                      showSearch
                      placeholder="Select Country"
                      optionFilterProp="children"
                      onSelect={(country) =>
                        country !== selectedCountry
                          ? setSelectedCountry(country)
                          : ""
                      }
                      filterOption={(input, option) =>
                        option.children[2]
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {countrySelectOptions()}
                    </Select>
                  </Form.Item>
                  <Form.Item label="City" required={true}>
                    <Select
                      showSearch
                      placeholder="Select City"
                      optionFilterProp="children"
                      value={selectedCity}
                      onSelect={(city) => setSelectedCity(city)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {citySelectOptions()}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Address" required={true}>
                    <Input.TextArea
                      placeholder="Address Detail"
                      value={addressDetail}
                      onChange={(e) => setAddressDetail(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 3 && (
              <div style={{ marginLeft: "30%", marginTop: 50 }}>
                <Col span={22}>
                  <Form.Item
                    label="Min. Locking Period(Months)"
                    required={true}
                  >
                    <Slider
                      min={3}
                      max={120}
                      value={minLockingPeriod}
                      onChange={(value) => setMinLockingPeriod(value)}
                    />
                    <InputNumber
                      min={3}
                      max={120}
                      style={{ margin: "0 16px" }}
                      value={minLockingPeriod}
                      onChange={(value) => setMinLockingPeriod(value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Max. Locking Period(Months)"
                    required={true}
                  >
                    <Slider
                      min={minLockingPeriod}
                      max={120}
                      value={maxLockingPeriod}
                      onChange={(value) => setMaxLockingPeriod(value)}
                    />
                    <InputNumber
                      min={minLockingPeriod}
                      max={120}
                      style={{ margin: "0 16px" }}
                      value={maxLockingPeriod}
                      onChange={(value) => setMaxLockingPeriod(value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={22}>
                  <Form.Item label={"Target Amount"} required={true}>
                    <Input
                      placeholder="Amount"
                      type="number"
                      style={{ width: 350 }}
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item label="Release Fund" required={true}>
                    <Radio.Group
                      defaultValue={0}
                      onChange={(e) => setReleaseFund(e.target.value)}
                    >
                      <Radio.Button value={0}>100% of Target</Radio.Button>
                      <Radio.Button value={1}>75% of Target</Radio.Button>
                      <Radio.Button value={2}>50% of Target</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="Security Manager" required={true}>
                    <Select
                      style={{ width: 350 }}
                      showSearch
                      placeholder="Select Security Manager"
                      optionFilterProp="children"
                      onChange={(value) => setSecurityManager(value)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {securityManagers.map((securityManager, index) => {
                        return (
                          <Select.Option key={index} value={securityManager}>
                            {securityManager}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 4 && (
              <div
                style={{
                  marginLeft: "30%",
                  marginTop: 50,
                }}
              >
                <h3>Congratulations!</h3>
                <p>
                  Please, click the save button in below to create your
                  community in blockchain.
                </p>
              </div>
            )}

            <div
              style={{
                marginTop: 24,
                marginRight: "16.5%",
                marginBottom: 10,
                float: "right",
              }}
            >
              {stepIndex > 0 && (
                <Button
                  style={{ margin: "0 8px" }}
                  onClick={() => setStepIndex(stepIndex - 1)}
                >
                  Previous
                </Button>
              )}

              {stepIndex < 4 && (
                <Button
                  type="primary"
                  onClick={() => setStepIndex(stepIndex + 1)}
                >
                  Next
                </Button>
              )}

              {stepIndex === 4 && (
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  style={{
                    backgroundColor: "#e67e22",
                    borderColor: "orange",
                  }}
                >
                  Save
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(CreateCommunity);

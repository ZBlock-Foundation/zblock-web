import React, { useEffect, useState } from "react";
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
  DatePicker,
  Radio,
} from "antd";
import UploadImage from "./UploadFile";
import { getAllCountries, getStatesOfCountry } from "../../api/countriesAPI";
import { addMonth } from "../../utils/dateUtils";

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

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const CreateCommunity = () => {
  const [images, setImages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

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

  useEffect(() => {
    console.log(images);
  }, [images]);

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

  // Steps
  const [stepIndex, setStepIndex] = useState(0);

  return (
    <React.Fragment>
      <h4 style={{ marginLeft: 10 }}>Create New Community</h4>
      <Divider />

      <Row gutter={16}>
        <Col span={2}></Col>
        <Col span={20}>
          <Steps current={stepIndex}>
            <Steps.Step key={0} title={"Details"} />
            <Steps.Step key={1} title={"Type"} />
            <Steps.Step key={2} title={"Purpose"} />
            <Steps.Step key={3} title={"Location"} />
            <Steps.Step key={4} title={"Images"} />
            <Steps.Step key={5} title={"Fund Locking"} />
            <Steps.Step key={6} title={"Fund Releasing"} />
            <Steps.Step key={7} title={"Done"} />
          </Steps>
        </Col>
        <Col span={2}></Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} style={{ marginTop: 20 }}>
          <Form {...layout} layout="horizontal">
            {stepIndex === 0 && (
              <div style={{ marginTop: 20 }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Name" required={true}>
                      <Input placeholder="Community Name" />
                    </Form.Item>

                    <Form.Item label="Description" required={true}>
                      <Input.TextArea
                        placeholder="Community Description"
                        rows={10}
                        minLength={10}
                        maxLength={500}
                      />
                    </Form.Item>

                    <Form.Item label="Website">
                      <Input placeholder="Community Website(if available)" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Founder Name" required={true}>
                      <Input placeholder="Community's Founder Name" />
                    </Form.Item>

                    <Form.Item label="Founder Email" required={true}>
                      <Input placeholder="Community's Founder Email" />
                    </Form.Item>

                    <Form.Item
                      label="Founder Phone"
                      required={true}
                      rules={[{ type: "email" }]}
                    >
                      <Input placeholder="Community's Founder Phone Number" />
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
                      onChange={(e) => console.log(e.target.value)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="0">Eco-Village</Select.Option>
                      <Select.Option value="1">Co-Housing</Select.Option>
                      <Select.Option value="2">Income Sharing</Select.Option>
                      <Select.Option value="3">Shared House/Flat</Select.Option>
                      <Select.Option value="4">Homestead</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 2 && (
              <div style={{ marginLeft: "20%" }}>
                <Col span={18}>
                  <Form.Item label="Community Purpose" required={true}>
                    <Select
                      mode="multiple"
                      showArrow={true}
                      placeholder={"Select Community Purpose Tags"}
                      tagRender={communityPurposeTagsRender}
                      options={communityPurposeOptions}
                    />
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 3 && (
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
                    <Input.TextArea placeholder="Address Detail" />
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 4 && (
              <div style={{ marginLeft: "30%", marginTop: 50 }}>
                <Col span={20}>
                  <Form.Item label="Community Image(s)">
                    <UploadImage handleImages={setImages} />
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 5 && (
              <div style={{ marginLeft: "30%", marginTop: 50 }}>
                <Col span={20}>
                  <Form.Item label="Min. Locking Period" required={true}>
                    <DatePicker
                      style={{ width: 200 }}
                      disabledDate={(date) =>
                        date && date < addMonth(3).endOf("day")
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Max. Locking Period" required={true}>
                    <DatePicker
                      style={{ width: 200 }}
                      disabledDate={(date) =>
                        date && date < addMonth(3).endOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 6 && (
              <div style={{ marginLeft: "20%", marginTop: 20 }}>
                <Col span={20}>
                  <Form.Item label={"Target Amount"} required={true}>
                    <Input
                      placeholder="Amount"
                      type="number"
                      style={{ width: 350 }}
                    />
                  </Form.Item>

                  <Form.Item label="Release Fund" required={true}>
                    <Radio.Group defaultValue="100">
                      <Radio.Button value="100">100% of Target</Radio.Button>
                      <Radio.Button value="75">75% of Target</Radio.Button>
                      <Radio.Button value="50">50% of Target</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="Security Manager" required={true}>
                    <Select
                      style={{ width: 350 }}
                      showSearch
                      placeholder="Select Security Manager"
                      optionFilterProp="children"
                      onChange={(e) => console.log(e.target.value)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="0">Security Manager1</Select.Option>
                      <Select.Option value="1">Security Manager2</Select.Option>
                      <Select.Option value="2">Security Manager3</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </div>
            )}

            {stepIndex === 7 && (
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
              {stepIndex < 7 && (
                <Button
                  type="primary"
                  onClick={() => setStepIndex(stepIndex + 1)}
                >
                  Next
                </Button>
              )}

              {stepIndex > 0 && (
                <Button
                  style={{ margin: "0 8px" }}
                  onClick={() => setStepIndex(stepIndex - 1)}
                >
                  Previous
                </Button>
              )}

              {stepIndex === 7 && (
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

export default CreateCommunity;

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Tag, Card, Button, Row, Col } from "antd";
import UploadImage from "./UploadFile";
import { getAllCountries, getStatesOfCountry } from "../../api/countriesAPI";

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

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card title="Create New Community">
          <Form {...layout} layout="horizontal">
            <Form.Item label="Community Name">
              <Input placeholder="community name" />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea placeholder="description" />
            </Form.Item>

            <Form.Item label="Community Type">
              <Select
                showSearch
                placeholder="select community type"
                optionFilterProp="children"
                onChange={(e) => console.log(e.target.value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Select.Option value="0">Eco-Village</Select.Option>
                <Select.Option value="1">Co-Housing</Select.Option>
                <Select.Option value="2">Income Sharing</Select.Option>
                <Select.Option value="3">Shared House/Flat</Select.Option>
                <Select.Option value="4">Homestead</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Community Purpose">
              <Select
                mode="multiple"
                showArrow
                tagRender={communityPurposeTagsRender}
                options={communityPurposeOptions}
              />
            </Form.Item>

            <Form.Item label="Country">
              <Select
                showSearch
                placeholder="select country"
                optionFilterProp="children"
                onSelect={(country) =>
                  country !== selectedCountry ? setSelectedCountry(country) : ""
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

            <Form.Item label="City">
              <Select
                showSearch
                placeholder="select city"
                optionFilterProp="children"
                value={selectedCity}
                onSelect={(city) => setSelectedCity(city)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {citySelectOptions()}
              </Select>
            </Form.Item>

            <Form.Item label="Address">
              <Input.TextArea placeholder="address detail" />
            </Form.Item>

            <Form.Item label="Upload Image(s)">
              <UploadImage handleImages={setImages} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
              <div style={{ width: "100px" }}>
                <Button
                  block={true}
                  type={"primary"}
                  size={"large"}
                  htmlType={"submit"}
                  style={{ backgroundColor: "#e67e22", borderColor: "orange" }}
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateCommunity;

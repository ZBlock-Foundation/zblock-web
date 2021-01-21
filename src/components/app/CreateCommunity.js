import React from "react";
import { Form, Input, Select, Tag } from "antd";

const CreateCommunity = () => {
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
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

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

  return (
    <div>
      <h3>Create New Community</h3>
      <Form {...layout} layout="horizontal">
        <Form.Item label="Community Name">
          <Input placeholder="community name" />
        </Form.Item>

        <Form.Item label="Community Type">
          <Select
            showSearch
            placeholder="select community type"
            optionFilterProp="children"
            onChange={(e) => console.log(e.target.value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
            onChange={(e) => console.log(e.target.value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="england">England</Select.Option>
            <Select.Option value="france">France</Select.Option>
            <Select.Option value="usa">USA</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="City">
          <Select
            showSearch
            placeholder="select city"
            optionFilterProp="children"
            onChange={(e) => console.log(e.target.value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="england">London</Select.Option>
            <Select.Option value="france">Paris</Select.Option>
            <Select.Option value="usa">Washington</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Address">
          <Input.TextArea placeholder="address detail" />
        </Form.Item>

        <Form.Item label="Purpose">
          <Input.TextArea placeholder="comnunity purpose" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCommunity;

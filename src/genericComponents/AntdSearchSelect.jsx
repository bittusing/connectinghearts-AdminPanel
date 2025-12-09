import React, { useState } from "react";
import { Select, Space } from "antd";

const AntdSearchSelect = ({ items, setState }) => {
  const handleChange = (value, option) => {
    setState({ ...option });
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Space wrap>
          <Select
            filterOption={filterOption}
            showSearch
            placeholder="Please Select"
            onSelect={handleChange}
            onSearch={onSearch}
            options={items}
            allowClear
          />
        </Space>
      </div>
    </div>
  );
};
export default AntdSearchSelect;

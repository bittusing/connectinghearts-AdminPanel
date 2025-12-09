import { Select } from "antd";
import React from "react";
import "./styles.css";

const MultiSelect = ({
  options,
  selectName,
  setData,
  value,
  mode,
  placeholder,
}) => {
  const handleChange = (value) => {
    setData(value);
  };

  return (
    <div className="select-container">
      <div className="select-label">{selectName}</div>
      <Select
        allowClear
        dropdownStyle={{ borderRadius: "5px" }}
        maxTagCount="responsive"
        className="select-filter"
        mode={mode ? mode : ""}
        placeholder={placeholder ? `Select ${placeholder}` : `Select`}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </div>
  );
};

export default MultiSelect;

import { Input } from "antd";
import React from "react";
import "./styles.css";

const CustomInput = ({
  placeHolder,
  labelName,
  onChange,
  value,
  handleBlur,
  id,
}) => {
  return (
    <div className="select-container">
      <div className="select-label">{labelName}</div>{" "}
      <Input
        id={id}
        className="select-filter"
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default CustomInput;

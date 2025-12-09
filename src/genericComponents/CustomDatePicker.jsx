import React from "react";
import { DatePicker } from "antd";
import "./styles.css";

const CustomDatePicker = ({
  value,
  labelName,
  onChange,
  disabledDate,
  disabled,
  ...props
}) => (
  <div>
    <div className="select-label">{labelName}</div>
    <DatePicker
      value={value}
      className="select-filter"
      onChange={onChange}
      disabledDate={disabledDate}
      disabled={disabled}
      format={"MM/DD/YYYY"}
      {...props}
    />
  </div>
);
export default CustomDatePicker;

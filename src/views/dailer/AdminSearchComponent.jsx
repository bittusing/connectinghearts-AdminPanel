import React from "react";
import { Form, Input, Button, DatePicker, Calendar } from "antd";
import dayjs from "dayjs";
import CustomDatePicker from "../../genericComponents/CustomDatePicker";
import CustomInput from "../../genericComponents/CustomInput";

const AdminSearchForm = ({
  setSearchValue,
  searchValue,
  dob,
  setDob,
  handleSearch,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle form submission here, e.g., make an API request with search parameters.
    // console.log("Search parameters:", values);
    handleSearch();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}
      className="form-component"
    >
      {/* <Form.Item
        name="visitorId"
        rules={[
          {
            required: true,
            message: "Visit ID is required",
          },
        ]}
      >
        <CustomInput
          placeHolder="Enter Visit ID"
          onChange={(e) => {
            setSearchValue({
              ...searchValue,
              visitorId: e.target.value,
            });
          }}
        />
      </Form.Item> */}
      <Form.Item
        name="memberId"
        // label="Search by Member ID/Name"
        rules={[
          {
            required: true,
            message: "Member ID/Name is required",
          },
        ]}
        style={{ marginBottom: "1rem" }}
      >
        <CustomInput
          placeHolder="Enter Member ID/Name"
          onChange={(e) => {
            setSearchValue({
              ...searchValue,
              memberIdOrName: e.target.value,
            });
          }}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        // label="Phone"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        rules={[
          {
            required: true,
            message: "Enter a valid number",
          },
        ]}
        style={{ marginBottom: "1rem" }}
      >
        <CustomInput
          placeHolder="Enter Primary Phone"
          onChange={(e) => {
            setSearchValue({
              ...searchValue,
              phone: e.target.value,
            });
          }}
        />
      </Form.Item>

      <Form.Item
        name="dob"
        // label="Search by DOB"
        rules={[
          {
            required: true,
            message: "DOB is required",
          },
        ]}
        style={{ marginBottom: "1rem" }}
      >
        <CustomDatePicker
          onChange={(d, date) => {
            setSearchValue({ ...searchValue, dob: date });
            setDob(d);
          }}
          disabledDate={(current) => {
            return current < dayjs().startOf("day");
          }}
          className="w-100"
          format={"MM/DD/YYYY"}
          style={{ borderRadius: "5px", width: "100%" }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: "1rem" }}>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminSearchForm;

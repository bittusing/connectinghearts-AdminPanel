import React, { useEffect, useState } from "react";
import { Button, Space, Divider, Checkbox, Form, Input } from "antd";
import logo from "../Assets/Images/ch.png";
import appConfig from "../configs/appConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, validateToken } from "../configs/apis/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); 
  const [loader, setLoader] = useState(false);

  useEffect(() => {
   
  }, []);
 

  const onFinish = async (values) => {
    console.log(values);
    setLoader(true);
    if (loader) return;
    let reqObj = {
      // phoneNumber: '9876543210',// values?.phoneNumber, //'9502939747',
      phoneNumber: values?.phoneNumber, //'9502939747',
      password:values?.password //'Hello@123',   
    };
    let response = await loginUser(reqObj);
   
    if (response?.status == 'success') {
      let tokenValidatedData = await validateToken(); 
      // toast.success(tokenValidatedData?.message)
      setTimeout(()=>{
        navigate('/dashboard');
      }, 1000)
      
    }
    setLoader(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "25rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          padding: "1rem",
          borderRadius: "5px",
          height:"60vh"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            className="img-fluid mr-5 mb-2 logo"
            src={logo}
            alt="logo"
            width={100}
          />
          <div>Welcome</div>
          <div>Login to Connecting Hearts</div>
        </div> 
        <Divider>OR</Divider>
        <Form
          layout="vertical"
          form={form}
          name="register"
          className="form-layout"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                type: "text",
              },
              {
                required: true,
                message: "Please input your phone number",
              },
              {
                pattern: /^[0-9]{10}$/, // Regular expression for a 10-digit phone number
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input   className="antd-input" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password   className="antd-input" />
          </Form.Item>

          {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Please accept T&C to Continue")
                      ),
              },
            ]}
          >
            <Checkbox>
              I agree to <a>Terms & Conditions</a> before login
            </Checkbox>
          </Form.Item> */}
          <Form.Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button block htmlType="submit" type="primary">
              {loader ? (
                <span className="loader"></span>
              ) : (
                <span className="btn-text">Login</span>
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

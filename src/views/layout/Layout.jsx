import {
  FileZipTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneTwoTone,
  UserAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/ch.png";
import {
  ROLE,
  callerHeaderText,
  routerUrlPathConstants,
  sideMenuConstants,
} from "../../constants";
import { logoutKey, logoutText } from "../../constants/textConstants";
import MultiSelect from "../../genericComponents/MultiSelect";
import { logoutUser } from "../../helpers/logout";
import { isEmpty } from "../../helpers/utilities";
import {
  addSelectedAccount,
  addSelectedProject,
  clearProjects,
} from "../../redux/slices/acountProjectSlice";
import { getAccounts } from "../dailer/apiCall";
const { Header, Sider, Content } = Layout;

const items = [
  {
    key: logoutKey,
    label: logoutText,
  },
];

const AppLayout = (props) => {
  const location = useLocation(); 
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState("");  

  const itemClickHandler = ({ key }) => {
    if (key === logoutKey) {
      logoutUser();
      navigate(routerUrlPathConstants.login);
    }
  };

  const menuItemClickHandler = (data) => {
    navigate(data?.key);
    setSelectedItem(data?.key);
  };
   
  
  
 
  return (
    <Layout>
      <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
        >
          <div
            style={{
              paddingTop:'10px',
              // paddingBottom:'10px',
              height: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              className="img-fluid mr-5 mb-2 logo"
              src={logo}
              alt="logo"
              width={50}
              height={50}
            />
          </div>
          <Menu
            theme="light"
            style={{ padding: "5px" }}
            defaultSelectedKeys={[location.pathname]}
            onClick={menuItemClickHandler}
            items={[ 
              {
                key: routerUrlPathConstants.dashboard,
                icon: (
                  <DashboardOutlined
                    twoToneColor={
                      selectedItem === routerUrlPathConstants.dashboard
                        ? "white"
                        : "#ff0057"
                    }
                    style={{ fontSize: "1.2rem" }}
                  />
                ),
                label: sideMenuConstants.dashboard,
              },
              // {
              //   key: routerUrlPathConstants.home,
              //   icon: (
              //     <FileZipTwoTone
              //       twoToneColor={
              //         selectedItem === routerUrlPathConstants.home
              //           ? "white"
              //           : "#ff0057"
              //       }
              //       style={{ fontSize: "1.2rem" }}
              //     />
              //   ),
              //   label: sideMenuConstants.exportMembers,
              // },
              // {
              //   key: routerUrlPathConstants.communication,
              //   icon: (
              //     <PhoneTwoTone
              //       twoToneColor={
              //         selectedItem === routerUrlPathConstants.communication
              //           ? "white"
              //           : "#ff0057"
              //       }
              //       style={{ fontSize: "1.2rem" }}
              //     />
              //   ),
              //   label: sideMenuConstants.dailer,
              // },
              
              
            ]}
          />
        </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  marginLeft: "1rem",
                }}
              /> 
            </div>
          <Dropdown
            menu={{ items: items, onClick: itemClickHandler }}
            trigger={["click"]}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: "#9b8cfa",
                    borderRadius: "50%",
                    marginRight: "0.5rem",
                  }}
                >
                  <UserAddOutlined
                    style={{ fontSize: "1.3rem", color: "white" }}
                  />
                </div>
                <span
                  style={{
                    marginRight: "1rem",
                    color: "#07090a",
                    fontSize: "1rem",
                  }}
                >
                  {userName}
                </span>
              </div>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "0.5rem",
            minHeight: "100vh",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;

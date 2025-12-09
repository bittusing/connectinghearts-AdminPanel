import React from "react";
import CustomTable from "./CustomTable";
import Searchbar from "./SearchBar";
import "./styles.css";
import PaperComponent from "./PaperComponent";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const AntdTable = ({
  tableData,
  tableFullData,
  tableHeaders,
  setTableData,
  handleShowAllUser,
  userType,
  loader,
  width = "40%",
}) => {
  return (
    <PaperComponent >
      <div style={{overflowY: 'scroll', paddingRight:10, maxHeight: 'calc(100vh - 10rem)'}}>
      <div style={{ textAlign: "start", margin: "0.5rem 0rem", width:'100%', display:'flex', justifyContent:'space-between',  }}>
        <Button  onClick={handleShowAllUser} style={{borderRadius:5, height:40}} size="small" type={userType=="all"?"primary":"default"}><FilterOutlined /> Show verified users as well</Button>
        <Searchbar
          width={'50%'}
          className="search-bar"
          key={"searchedData"}
          placeholder={"Search..."}
          getSearchedData={setTableData}
          data={tableFullData}
        />
      </div>
       

      <CustomTable
        id="customTable"
        tableData={tableData}
        columns={tableHeaders}
        loading={loader}
        paginationPosition={"bottomLeft"}
        showSizeChanger={true}
        csvName="ch_users"
      />
      </div>
    </PaperComponent>
  );
};

export default AntdTable;

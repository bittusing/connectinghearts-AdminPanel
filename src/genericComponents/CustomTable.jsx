import React, { useState } from "react";
import { Button, Table } from "antd";
import {
  convertJSONToCSV,
  csvDataColumn,
} from "../utility/helpers/downloadCSV";
import { btnText } from "../constants/textConstants";

const CustomTable = ({
  columns,
  tableData,
  showSizeChanger,
  paginationPosition,
  loading,
  csvName,
}) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  return (
    <div className="table-container">
      <Table
        className="ant-table-border"
        columns={columns}
        dataSource={tableData}
        onChange={handleChange}
        pagination={{
          showSizeChanger: showSizeChanger,
          position: [paginationPosition ?? "bottomRight"],
          total: tableData?.length,
          showTotal: (total) => `Total ${total} Items.`,
        }}
        scroll={{  x: 5000 }} 
        loading={loading}
        sortDirections={["ascend", "descend", "ascend"]}
      />
       {tableData?.length ? (
        <div className="downloadbtns">
          <Button
            outline
            type="primary"
            style={{background:'#333'}}
            className="me-1"
            onClick={() => {
              convertJSONToCSV(
                csvDataColumn(tableData, columns), columns,
                csvName
              );
            }}
            disabled={tableData?.length ? false : true}
          >
            {btnText.downloadCSV}
          </Button>
        </div>
      ) : null}  
    </div>
  );
};

export default CustomTable;

import React from "react";
import { Tabs } from "antd";
import AntdTable from "./AntdTable";

const TableGrid = ({ tableData, setTableData, tableHeaders }) => {
  const onChange = (key) => {
    console.log(tableData, tableHeaders);
  };

  const items = [
    {
      key: "1",
      label: "Call Initiation",
      children: (
        <div style={{ height: "60vh", overflow: "auto" }}>
          <AntdTable
            setTableData={setTableData}
            tableHeaders={tableHeaders}
            tableData={tableData}
          />
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: "Screening Test",
    //   children: "Content of Tab Pane 2",
    // },
    // {
    //   key: "3",
    //   label: "Diagnosis",
    //   children: "Content of Tab Pane 3",
    // },
    // {
    //   key: "4",
    //   label: "Prevention Plan",
    //   children: "Content of Tab Pane 4",
    // },
    // {
    //   key: "5",
    //   label: "SDOH",
    //   children: "Content of Tab Pane 5",
    // },
    // {
    //   key: "6",
    //   label: "Care Coordination",
    //   children: "Content of Tab Pane 6",
    // },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default TableGrid;

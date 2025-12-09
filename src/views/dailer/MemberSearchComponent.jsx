import React from "react";
import AntdGenericDialog from "../../genericComponents/AntdGenericDilaog";
import { Radio, Table } from "antd";

const MemberSearchDialog = ({
  show,
  handleClose,
  handleConfirm,
  modalHeader,
}) => {
  const [selectedMember, setSelectedMember] = React.useState({});
  const [selectedId, setSelectedId] = React.useState(null);

  const handleRadioChange = (e, row) => {
    if (selectedId === row.hpMemberID) {
      setSelectedId(null);
      setSelectedMember({});
    } else {
      setSelectedId(e.target.value);
      setSelectedMember(row);
    }
  };

  const columns = [
    {
      title: "",
      key: "action",
      width: 2,
      render: (text, record) => (
        <Radio
          value={record.hpMemberID}
          onClick={(e) => handleRadioChange(e, record)}
          // checked={selectedId === record.hpMemberID}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  return (
    <AntdGenericDialog
      show={show}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
      modalHeader={modalHeader}
      className=""
    >
      <Table dataSource={dataSource} columns={columns} />;
    </AntdGenericDialog>
  );
};

export default MemberSearchDialog;

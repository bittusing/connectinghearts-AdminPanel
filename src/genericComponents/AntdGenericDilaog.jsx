import { Modal } from "antd";
import React from "react";

const AntdGenericDialog = ({
  show,
  modalHeader,
  handleClose,
  handleConfirm,
  children,
  className,
}) => {
  return (
    <div>
      <Modal
        title={modalHeader}
        centered
        open={show}
        onOk={handleConfirm}
        onCancel={handleClose}
        className={className}
        okText="Confirm"
      >
        {children}
      </Modal>
    </div>
  );
};

export default AntdGenericDialog;

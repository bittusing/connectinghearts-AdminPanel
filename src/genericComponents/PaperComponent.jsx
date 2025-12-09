import React from "react";

const PaperComponent = ({ children, padding = "0.5rem" }) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: padding,
        borderRadius: "5px",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </div>
  );
};

export default PaperComponent;

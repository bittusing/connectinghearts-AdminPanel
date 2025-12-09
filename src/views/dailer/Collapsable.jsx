import React from "react";
import { humanize, isEmpty } from "../../helpers/utilities";
import "./dailer.css"

const Collapsable = ({ dataPanel, primaryColumns }) => {
  const [showDiv1, setShowDiv1] = React.useState(true);
  const handleSwitchDiv = () => {
    setShowDiv1(!showDiv1);
  };

  const filteredMemdata =
    !isEmpty(dataPanel) &&
    Object.keys(dataPanel)
      .filter((key) => Object.keys(primaryColumns).includes(key))
      .reduce((obj, key) => {
        // Use the labels from primaryColumns
        obj[key] = {
          label: primaryColumns[key],
          value: dataPanel[key],
        };
        return obj;
      }, {});

  return (
    <>
      {showDiv1 ? (
        <div id="row1" onClick={() => handleSwitchDiv()}>
          {!isEmpty(filteredMemdata) &&
            Object.keys(filteredMemdata).map((key, i) => {
              const item = filteredMemdata[key];
              return (
                <div className="column item" key={i}>
                  <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
                    {item.label}
                  </span>
                  : <span>{item.value}</span>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="row grid" id="row1" onClick={() => handleSwitchDiv()}>
          {!isEmpty(dataPanel) &&
            Object.keys(dataPanel)?.map((key, i) => {
              return (
                <div className="column item" key={i}>
                  <label
                    style={{ color: "#ccc", fontSize: "0.9rem" }}
                    className="label"
                  >
                    {humanize(key)}
                  </label>
                  <div style={{ fontSize: "1rem" }}>{dataPanel[key]}</div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
export default Collapsable;

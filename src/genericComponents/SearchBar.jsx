import React from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

const Searchbar = ({ placeholder, getSearchedData, data, width }) => {
  const [searchValue, setSearchValue] = useState("");
  function debounce(func, delay) {
    let timerId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timerId);
      timerId = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }
  const handleSearch = (e) => {
    let searchValue = e?.target?.value;
    const table_data = [...data];
    if (searchValue.length) {
      const filterTable = table_data.filter((item) =>
        Object.keys(item).some((k) =>
          String(item[k]).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      getSearchedData(filterTable);
    } else {
      getSearchedData(data);
    }
  };
  const debouncedEvent = debounce(handleSearch, 1000);

  const handleClear = () => {
    setSearchValue("");
    getSearchedData(data);
  };

  return ( 
      <Input
        style={{ width: width }}
        value={searchValue}
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        suffix={<CloseOutlined onClick={handleClear} />}
        className="site-form-item-icon search-bar"
        onChange={(e) => {
          setSearchValue(e.target.value);
          debouncedEvent(e);
        }}
        size="large"
        loading
      /> 
  );
};

export default Searchbar;

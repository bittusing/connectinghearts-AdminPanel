import React, { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { Select, Spin } from "antd";

import { getRequest } from "../configs/apis/axiosService";

import "./styles.css";

function DebounceSelect({
  fetchOptions,
  fetchOptionsURL,
  selectName,
  value,
  debounceTimeout = 800,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value, fetchOptionsURL).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <div className="select-container">
      <div className="select-label">{selectName}</div>
      <Select
        allowClear
        labelInValue
        className="select-filter"
        maxTagCount="responsive"
        filterOption={false}
        value={value}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    </div>
  );
}

// Usage of DebounceSelect

async function fetchUserList(username, url) {
  let response = await getRequest(`${url}${username}`);
  return response?.data?.result?.payload["PCPs"]?.map((user) => ({
    key: user.providerId,
    label: `${user.firstName} ${user.lastName}`,
    value: `${user.firstName} ${user.lastName}`,
  }));
}

const APISelect = ({ fetchOptionsURL, selectName, setData, currentvalue }) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setValue(currentvalue);
  }, [currentvalue]);
  return (
    <DebounceSelect
      mode="multiple"
      value={value}
      placeholder="Search"
      fetchOptions={fetchUserList}
      selectName={selectName}
      fetchOptionsURL={fetchOptionsURL}
      onChange={(newValue) => {
        setValue(newValue);
        setData(newValue);
      }}
    />
  );
};
export default APISelect;

import React, { useEffect, useState } from "react";
import AntdTable from "../../genericComponents/AntdTable";
import { postRequest } from "../../configs/apis/axiosService";
import MemberExportFilters from "./MemberExportFilters";
import {
  getDisposition,
  getHealthOptions,
  getOperators,
  getStateOptions,
  getVisitingPhysicianOptions,
} from "./apiService";
import { Button } from "antd";

const MemberExport = () => {
  const [optionList, setOptionList] = useState({
    visitingPhysician: [],
    callDisposition: [],
    callOperator: [],
    healthPlan: [],
    state: [],
    pcp: [],
  });

  const [tableData, setTableData] = useState([]);
  const [tableFullData, setTableFullData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getOptionsList();
  }, []);

  const getOptionsList = async () => {
    let healthResponse = await getHealthOptions();
    let stateResponse = await getStateOptions();
    let dispoResponse = await getDisposition();
    let operatorResponse = await getOperators();
    let visitingPhysicianRes = await getVisitingPhysicianOptions();

    healthResponse = healthResponse?.data?.result?.payload?.healthplans.map(
      (plan) => ({
        label: `${plan.healthplan}`,
        value: `${plan.healthPlanID}`,
      })
    );
    stateResponse = stateResponse?.data?.result?.payload?.states.map(
      (state) => ({
        label: `${state.state}`,
        value: `${state.state}`,
      })
    );

    dispoResponse = dispoResponse?.data?.result?.payload["call"]?.map(
      (dispo) => ({
        label: `${dispo.description}`,
        value: `${dispo.dispositionId}`,
      })
    );

    operatorResponse = operatorResponse?.data?.result?.payload?.map(
      (operator) => ({
        label: `${operator.lookupDesc}`,
        value: `${operator.lookupId}`,
      })
    );
    visitingPhysicianRes = visitingPhysicianRes?.data?.result?.payload?.map(
      (name) => ({
        label: `${name.physician_name}`,
        value: `${name.physician_id}`,
      })
    );
    setOptionList((prevState) => ({
      ...prevState,
      healthPlan: healthResponse,
      state: stateResponse,
      callDisposition: dispoResponse,
      callOperator: operatorResponse,
      visitingPhysician: visitingPhysicianRes,
    }));
  };

  const onVisitIDclick = (data) => {
    let callId = data?.callId ?? "";
    let memberId = data?.memberId ?? "";
    let visitId = data?.visitId ?? "";
    let campaignName = data?.campaignName ?? "";
    const url = `/communication?callId=${callId}&memberId=${memberId}&visitId=${visitId}&campaignName=${campaignName}`;
    window.open(url, "_blank");
  };

  const getMemberExportGrid = async (reqBody) => {
    setLoader(true);
    let response = await postRequest(`getMemberExportData`, reqBody);
    setTableData(response?.data?.result?.payload?.source);
    setTableFullData(response?.data?.result?.payload?.source);
    setTableHeaders(response?.data?.result?.payload?.parentHeader);
    setLoader(false);
  };

  return (
    <div>
      <MemberExportFilters
        optionList={optionList}
        submitHandler={getMemberExportGrid}
      />
      <AntdTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        setTableData={setTableData}
        tableFullData={tableFullData}
        loader={loader}
      />
      <Button onClick={() => onVisitIDclick({})}>export</Button>
    </div>
  );
};

export default MemberExport;

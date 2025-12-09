import { Button } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import appConfig from "../../configs/appConfig";
import { apiURL } from "../../constants/apiConstants";
import { btnText, texts } from "../../constants/textConstants";
import APISelect from "../../genericComponents/APISelect";
import CustomDatePicker from "../../genericComponents/CustomDatePicker";
import CustomInput from "../../genericComponents/CustomInput";
import MultiSelect from "../../genericComponents/MultiSelect";
import PaperComponent from "../../genericComponents/PaperComponent";
import { isEmpty } from "../../helpers/utilities";
import "./exportFilters.css";

const defaultStateObj = {
  startDate: null,
  endDate: null,
  memberId: "",
  memberName: "",
  operators: null,
  callCount: "",
  healthPlan: [],
  states: [],
  callDispositions: [],
  physicians: [],
  pcp: [],
};

const pcpFetchURL = `${apiURL.getPcp}?pcpName=`;

const getPcpIds = (data) => {
  let arr = data?.map((pcp) => pcp.key);
  return arr;
};

const MemberExportFilters = ({ optionList, submitHandler }) => {
  const [stateData, setStateData] = useState(defaultStateObj);
  const [errors, setErrors] = useState({
    memberId: {
      errorFlag: false,
      errorMessage: "Member ID must be alphanumeric",
    },
    memberName: {
      errorFlag: false,
      errorMessage: "Member Name must be alphabets",
    },
    callCount: {
      errorFlag: false,
      errorMessage: "Call Count must be Numbers",
    },
  });
  const Accounts = useSelector(
    (state) => state.accountProjectReducer.accountId
  );
  const Projects = useSelector(
    (state) => state.accountProjectReducer.projectId
  );
  const clearFilters = () => {
    setStateData(defaultStateObj);
    setErrors({
      ...errors,
      memberId: {
        ...errors.memberId,
        errorFlag: false,
      },
      memberName: {
        ...errors.memberName,
        errorFlag: false,
      },
      callCount: {
        ...errors.memberId,
        errorFlag: false,
      },
    });
  };
  const onSubmit = () => {
    //do not submit when errors
    const errorFlags = Object.values(errors).map((error) => error.errorFlag);
    if (errorFlags.some((flag) => flag === true)) {
      return false;
    }
    if (!Accounts.length && !Projects.length) {
      toast.error("Account and Project required");
      return null;
    }
    let reqBody = {
      clientId: appConfig.clientId,
      account: Accounts,
      project: Projects,
      healthPlan: stateData.healthPlan,
      state: stateData.states,
      pcp: getPcpIds(stateData.pcp),
      visitStartDate: stateData.startDate
        ? dayjs(stateData.startDate).format("YYYY-MM-DD")
        : "2000-01-01",
      visitEndDate: stateData.endDate
        ? dayjs(stateData.endDate).format("YYYY-MM-DD")
        : "2100-01-01",
      visitingPhysician: stateData.physicians,
      callDisposition: stateData.callDispositions,
      memberId: stateData.memberId,
      callOperator: stateData.operators ? stateData.operators : "",
      callCount: stateData.callCount,
    };
    submitHandler(reqBody);
  };

  const onChangeHandler = (data, key) => {
    let obj = { ...stateData };
    obj[key] = data;
    if (key === "startDate") obj["endDate"] = null;
    validateFilters(obj, key);
  };
  const validateFilters = (obj, key) => {
    if (key === "memberId") {
      if (obj[key] && /^[a-zA-Z0-9]+$/.test(obj[key])) {
        setErrors({
          ...errors,
          memberId: {
            ...errors?.memberId,
            errorFlag: false,
          },
        });
        setStateData(obj);
      } else {
        setErrors({
          ...errors,
          memberId: {
            ...errors?.memberId,
            errorFlag: true,
          },
        });
        setStateData(obj);
      }
    } else if (key === "memberName") {
      if (obj[key] && /^[a-zA-Z ]+$/.test(obj[key])) {
        setErrors({
          ...errors,
          memberName: {
            ...errors?.memberName,
            errorFlag: false,
          },
        });
        setStateData(obj);
      } else {
        setErrors({
          ...errors,
          memberName: {
            ...errors?.memberName,
            errorFlag: true,
          },
        });
        setStateData(obj);
      }
    } else if (key === "callCount") {
      if (obj[key] && /^[0-9]+$/.test(obj[key])) {
        setErrors({
          ...errors,
          callCount: {
            ...errors?.callCount,
            errorFlag: false,
          },
        });
        setStateData(obj);
      } else {
        setErrors({
          ...errors,
          callCount: {
            ...errors?.callCount,
            errorFlag: true,
          },
        });
        setStateData(obj);
      }
    } else setStateData(obj);
  };
  return (
    <PaperComponent>
      <div className="subtitle-font">Export Members</div>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <CustomDatePicker
          labelName={texts.visitStart}
          value={stateData.startDate}
          onChange={(e) => onChangeHandler(e, "startDate")}
          disabledDate={(current) =>
            current && current > dayjs().startOf("day")
          }
        />
        <CustomDatePicker
          labelName={texts.visitEnd}
          value={stateData.endDate}
          onChange={(e) => onChangeHandler(e, "endDate")}
          disabledDate={(current) =>
            (current && current > dayjs().endOf("day")) ||
            current < dayjs(stateData.startDate).startOf("day")
          }
        />
        <MultiSelect
          mode="multiple"
          options={optionList?.visitingPhysician}
          selectName={texts.visitingPhysician}
          setData={(e) => onChangeHandler(e, "physicians")}
          value={stateData.physicians}
        />
        <MultiSelect
          mode="multiple"
          options={optionList?.callDisposition}
          selectName={texts.callDispo}
          setData={(e) => onChangeHandler(e, "callDispositions")}
          value={stateData.callDispositions}
        />
        <div>
          <CustomInput
            placeHolder="Type Here"
            labelName={texts.memberID}
            onChange={(e) => onChangeHandler(e.target.value, "memberId")}
            value={stateData.memberId}
            handleBlur={(e) => {
              if (isEmpty(e.target.value))
                setErrors({
                  ...errors,
                  memberId: {
                    ...errors.memberId,
                    errorFlag: false,
                  },
                });
            }}
          />
          {!isEmpty(errors) && errors?.memberId?.errorFlag && (
            <div className="error">{errors?.memberId?.errorMessage}</div>
          )}
        </div>
        <div>
          <CustomInput
            placeHolder="Type Here"
            labelName={texts.memberName}
            onChange={(e) => onChangeHandler(e.target.value, "memberName")}
            value={stateData.memberName}
            handleBlur={(e) => {
              if (isEmpty(e.target.value))
                setErrors({
                  ...errors,
                  memberName: {
                    ...errors.memberName,
                    errorFlag: false,
                  },
                });
            }}
          />
          {!isEmpty(errors) && errors?.memberName?.errorFlag && (
            <div className="error">{errors?.memberName?.errorMessage}</div>
          )}
        </div>
        <MultiSelect
          options={optionList.callOperator}
          selectName={texts.callOperator}
          setData={(e) => onChangeHandler(e, "operators")}
          value={stateData.operators}
        />
        <div>
          <CustomInput
            placeHolder="Type Here"
            labelName={texts.callCount}
            onChange={(e) => onChangeHandler(e.target.value, "callCount")}
            value={stateData.callCount}
            handleBlur={(e) => {
              if (isEmpty(e.target.value))
                setErrors({
                  ...errors,
                  callCount: {
                    ...errors.callCount,
                    errorFlag: false,
                  },
                });
            }}
          />
          {!isEmpty(errors) && errors?.callCount?.errorFlag && (
            <div className="error">{errors?.callCount?.errorMessage}</div>
          )}
        </div>
        <MultiSelect
          mode="multiple"
          options={optionList.healthPlan}
          selectName={texts.healthplan}
          setData={(e) => onChangeHandler(e, "healthPlan")}
          value={stateData.healthPlan}
        />
        <MultiSelect
          mode="multiple"
          options={optionList.state}
          selectName={texts.state}
          setData={(e) => onChangeHandler(e, "states")}
          value={stateData.states}
        />
        <APISelect
          fetchOptionsURL={pcpFetchURL}
          selectName={texts.pcp}
          setData={(e) => onChangeHandler(e, "pcp")}
          currentvalue={stateData.pcp}
        />
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <Button className="filters-btn btn-layout" onClick={clearFilters}>
            {btnText.clear}
          </Button>
          <Button className="btn-layout" type="primary" onClick={onSubmit}>
            {btnText.submit}
          </Button>
        </div>
      </div>
    </PaperComponent>
  );
};

export default MemberExportFilters;

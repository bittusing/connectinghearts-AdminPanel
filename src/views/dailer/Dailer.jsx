import React, { useEffect } from "react";
import { Button, Spin } from "antd";
import "./layout.css";
import TableGrid from "../../genericComponents/TableGrid";
import { isAdmin, isEmpty } from "../../helpers/utilities";
import { memberPrimaryColumns, visitorPrimaryColumns } from "../../constants";
import { useState } from "react";
import {
  getCallHistory,
  getCreateCall,
  getMemberData,
  getVisitorData,
} from "./apiCall";
import MemberSearchDialog from "./MemberSearchComponent";
import PaperComponent from "../../genericComponents/PaperComponent";
import CallTimer from "./CallTimer";
import DispositionComponent from "./DispositionComponent";
import AdminSearchForm from "./AdminSearchComponent";
import Collapsable from "./Collapsable";

const Dialer = () => {
  const [isLoading, setLoading] = useState(false);
  const [isCallEnded, setCallEnded] = useState(false);
  const [showMemberSearchModal, setShowMemberSearchModal] = useState(false);

  const [dob, setDob] = useState(null);
  const [memberTimeZone, setMemberTimeZone] = useState("");
  const [tableData, setTableData] = useState();
  const [tableHeaders, setTableHeaders] = useState();
  const [visitorInfoPanel, setVisitorInfoPanel] = useState({
    visitId: "",
    DOS: "",
    visitType: "",
    providerName: "",
    consentForCareDuringVisit: "",
  });
  const [memberInfoPanel, setMemberInfoPanel] = useState({
    name: "",
    MemberID: "",
    dob: "",
    age: "",
    gender: "",
    primaryPhone: "",
    secondaryPhone: "",
    emailAddress: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    language: "",
    pcpName: "",
  });

  const [searchValue, setSearchValue] = useState({
    memberIdOrName: "",
    phone: "",
    dob: null,
    visitorId: "",
  });

  useEffect(() => {
    setLoading(true);
    getMemberData("1", "ggg")
      .then((res) => {
        setLoading(false);
        let timeZone = res.data.result.payload?.timeZone;
        if (timeZone) setMemberTimeZone(timeZone);
        setMemberInfoPanel((prevState) => {
          const { firstName, lastName, pcpFirstName, pcpLastName, ...rest } =
            res?.data?.result?.payload;
          const name = firstName + " " + lastName;
          const pcpName = pcpFirstName + " " + pcpLastName;
          return { ...rest, name, pcpName };
        });
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getVisitorData()
      .then((res) => {
        setLoading(false);
        setVisitorInfoPanel((prevState) => {
          // const { consentDuringForVisit, ...rest } = res?.data?.result?.payload;
          // const consentForCareDuringVisit = consentDuringForVisit;
          return res?.data?.result?.payload
        });
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getCreateCall("1", "ggg")
      .then((res) => {})
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getCallHistory("1", "ggg")
      .then((res) => {
        setLoading(false);
        setTableData(res?.result?.payload?.CallHistory);
        let headers = res?.result?.payload?.parentHeaders
          ? res?.result?.payload?.parentHeaders
          : [];
        setTableHeaders(Object.keys(headers).join(","));
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const handleEndCall = () => {
    setCallEnded(true);
    //call api to finish call
  };

  const handleSearch = () => {
    console.log(searchValue, "searchValues");
    setShowMemberSearchModal(true);
  };
  return (
    <div className="split-container">
      <div className="column" id="column1">
        <div style={{ height: "100vh", overflow: "auto" }}>
          {/* search component for admin */}
          {isAdmin() ? (
            <div style={{ padding: "0.5rem 0rem 0rem 0.5rem" }}>
              <AdminSearchForm
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                dob={dob}
                setDob={setDob}
                handleSearch={handleSearch}
              />
            </div>
          ) : null}
          {/* member info */}

          {isLoading && isEmpty(memberInfoPanel.MemberID) ? (
            <div className="example">
              <Spin />
            </div>
          ) : (
            <PaperComponent key="member-info">
              <div style={{ fontWeight: "600", top: 0 }}>Member Info</div>
              <Collapsable
                dataPanel={memberInfoPanel}
                primaryColumns={memberPrimaryColumns}
              />
            </PaperComponent>
          )}
          {/* visitor info */}

          {isLoading && isEmpty(visitorInfoPanel.consentForCareDuringVisit) ? (
            <div className="example">
              <Spin />
            </div>
          ) : (
            <PaperComponent key="visit-info">
              <div style={{ fontWeight: "600" }}>Visitor Info</div>
              <Collapsable
                dataPanel={visitorInfoPanel}
                primaryColumns={visitorPrimaryColumns}
              />
            </PaperComponent>
          )}
          {/* table grid */}
          {isLoading ? (
            <div className="example">
              <Spin />
            </div>
          ) : (
            <PaperComponent key="tabs">
              <TableGrid
                tableData={tableData}
                tableHeaders={tableHeaders}
                setTableData={setTableData}
              />
            </PaperComponent>
          )}
        </div>
      </div>
      {/* call component */}
      <div className="column" id="column2">
        {!isAdmin() && (
          <PaperComponent id="call-component">
            {isLoading ? (
              <div className="example">
                <Spin />
              </div>
            ) : (
              <CallTimer isEnded={isCallEnded} />
            )}
            <Button
              type="primary"
              danger
              style={{ width: "100px" }}
              onClick={handleEndCall}
            >
              End Call
            </Button>
          </PaperComponent>
        )}

        {/* disposition component */}
        <DispositionComponent memberTimeZone={memberTimeZone} />
      </div>
      <MemberSearchDialog
        show={showMemberSearchModal}
        handleClose={() => setShowMemberSearchModal(false)}
        handleConfirm={() => setShowMemberSearchModal(false)}
        modalHeader="Member Search Result"
      />
    </div>
  );
};
export default Dialer;

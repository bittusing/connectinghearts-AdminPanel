import { Button, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import Typography from "antd/es/typography/Typography";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { clientDisposition } from "../../constants";
import Dropdown from "../../genericComponents/AntdSearchSelect";
import CustomDatePicker from "../../genericComponents/CustomDatePicker";
import CustomInput from "../../genericComponents/CustomInput";
import PaperComponent from "../../genericComponents/PaperComponent";
import { isEmpty } from "../../helpers/utilities";
import { getDispositionLookup } from "./apiCall";

const DispositionComponent = ({ memberTimeZone }) => {
  const [disposition, setDisposition] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [dispositionLookUp, setDispositionLookUp] = useState([]);
  const [timeZonesList, setTimeZonesList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedTime, setSelectedTime] = useState({
    from: null,
    to: null,
  });
  const [caregiver, setCareGiver] = useState({
    name: null,
    contact: null,
  });
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    memberTimeZone?.split(" ")[1]
  );
  const getTimeZones = () => {
    // console.log(Intl.supportedValuesOf("timeZone"));
    return Intl.supportedValuesOf("timeZone").filter((item) =>
      item.includes("America")
    );
  };

  useEffect(() => {
    setLoading(true);
    getDispositionLookup("1")
      .then((res) => {
        setLoading(false);
        const dispositions = res?.data?.result?.payload["call"]
          .filter((item) => item.isVisible)
          .map((disposition) => ({
            ...disposition,
            value: disposition?.clientDispositionId,
            label: disposition?.description,
          }));
        setDispositionLookUp(dispositions);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    let timezones = getTimeZones();
    let americanZones = timezones?.filter((item) => item?.includes("America"));
    setTimeZonesList(americanZones);
  }, []);

  const handleSubmit = () => {
    //on submit disposition
    if (isEmpty(disposition)) {
      toast.warn("Call Notes and Disposition are required");
    } else {
      console.log(disposition, "disposition");
      console.log(selectedDate, "selectedDate");
      console.log(notes, "notes");
      console.log(selectedTimeZone, "selectedTimeZone");
      console.log(selectedTime, "selectedTime");
      console.log(caregiver, "caregiver");
    }
  };
  return (
    <PaperComponent>
      <div style={{ fontWeight: "600" }}>
        Notes <span style={{ color: "red" }}>*</span>
      </div>
      <div className="notes" id="">
        <div id="table-row">
          <TextArea
            rows={3}
            placeholder="Type your notes here..."
            autoSize={{ minRows: 3, maxRows: 3 }}
            inputProps={{ maxLength: 100 }}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      <div style={{ fontWeight: "600" }}>
        Dispositions <span style={{ color: "red" }}>*</span>
      </div>

      <div className="notes" id="">
        <Dropdown items={dispositionLookUp} setState={setDisposition} />
      </div>
      {!isEmpty(disposition) &&
      disposition?.value === clientDisposition.CALL_BACK_REQUEST_ID ? (
        <div style={{ margin: "5px" }}>
          <Typography
            sx={{ marginBottom: "20px", fontSize: "14px", fontWeight: "600" }}
          ></Typography>
          <Select
            showSearch
            onSelect={(value) => setSelectedTimeZone(value)}
            placeholder="Select a time zone"
            style={{ width: 200, marginBottom: "10px" }}
          >
            {timeZonesList.map((zone) => (
              <Option key={zone} value={zone}>
                {zone}
              </Option>
            ))}
          </Select>
          <div>
            <CustomDatePicker
              labelName="Preffered Date"
              value={startDate}
              onChange={(date, dateString) => {
                setStartDate(date);
                setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
              }}
              disabledDate={(current) => {
                return current < dayjs().startOf("day");
              }}
              className="w-100"
              style={{
                borderRadius: "5px",
                width: "100%",
                marginBottom: "10px",
              }}
              format="MM/DD/YYYY"
            />
          </div>
          <div className="select-label" style={{ margin: "5px" }}>
            Preferred Time
          </div>
          <div>
            <label style={{ margin: "10px" }}>From Time</label>
            <TimePicker
              value={fromTime}
              style={{ borderRadius: "5px" }}
              format="HH:mm"
              onChange={(time, timeString) => {
                setFromTime(time);
                setSelectedTime({ ...selectedTime, from: timeString });
              }}
            />
            <label style={{ margin: "10px", marginRight: "10px" }}>
              To Time
            </label>
            <TimePicker
              value={toTime}
              format="HH:mm"
              onChange={(time, timeString) => {
                setToTime(time);
                setSelectedTime({ ...selectedTime, to: timeString });
              }}
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className="container" id="">
            <Button
              type="primary"
              style={{ width: "100px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : disposition?.value === clientDisposition.CARE_GIVER_ID &&
        disposition?.isGuardianRequired === true ? (
        <>
          <div>
            {" "}
            <CustomInput
              labelName="Care Giver Name"
              onChange={(e) =>
                setCareGiver({ ...caregiver, name: e.target.value })
              }
              placeHolder="Enter Care Giver Name"
            />
            <CustomInput
              labelName="Care Giver Contact Number"
              onChange={(e) =>
                setCareGiver({ ...caregiver, contact: e.target.value })
              }
              placeHolder="Enter Care Giver Contct"
            />
          </div>
          <div className="container" id="">
            <Button
              type="primary"
              style={{ width: "100px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <div className="container" id="">
          <Button
            type="primary"
            style={{ width: "100px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      )}
    </PaperComponent>
  );
};
export default DispositionComponent;

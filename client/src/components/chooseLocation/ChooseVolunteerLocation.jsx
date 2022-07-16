import React from "react";
import "./chooseVolunteerLocation.css";
import Select from "react-select";

const ChooseVolunteerLocation = ({
  volunteerLocation,
  handleCheck,
  onSubmit,
  setChooseLocation,
}) => {
  return (
    <div className="container-flex-flex-col form-container form-page-background">
      <div className="location-checkboxes-container">
        <h3>בחר/י איזור התנדבות</h3>
        {/* {chooseVolunteerLocation()} */}
        <Select
          options={volunteerLocation}
          getOptionLabel={(volunteerLocation) => volunteerLocation.regionName}
          getOptionValue={(volunteerLocation) => volunteerLocation.regionName}
          onChange={(e) => handleCheck(e)}
          placeholder="בחר איזור התנדבות"
        />
        <button className="btn btn-purple" onClick={onSubmit}>
          הרשמה
        </button>
        <p className="go-back" onClick={() => setChooseLocation(false)}>
          חזרה
        </p>
      </div>
    </div>
  );
};

export default ChooseVolunteerLocation;

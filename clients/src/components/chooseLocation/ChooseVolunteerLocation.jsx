import React from "react";
import "./chooseVolunteerLocation.css";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import Select from "react-select";

const ChooseVolunteerLocation = ({
  volunteerLocation,
  handleCheck,
  onSubmit,
  setChooseLocation,
}) => {
  const chooseVolunteerLocation = () => {
    return volunteerLocation.map((location, index) => {
      return (
        <div key={index} className="selected-row">
          {/* <input
            type="checkbox"
            name={location.regionName}
            id={location.regionName}
            onChange={() => handleCheck(index)}
          />
          <label htmlFor={location.regionName}>
            אזור {location.regionName}
          </label> */}

          <Checkbox
            name={location.regionName}
            id={location.regionName}
            checked={location.selected}
            // value={location.selected}
            onChange={() => handleCheck(index)}
          />
          <label htmlFor={location.regionName}>
            אזור {location.regionName}
          </label>
        </div>
      );
    });
  };
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

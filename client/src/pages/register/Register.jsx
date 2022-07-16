import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Form from "../../components/form/Form";
import "./register.css";
import { isValid } from "../../utils/formValidation";
import { useAuth } from "../../context/auth-context";

import ChooseVolunteerLocation from "../../components/chooseLocation/ChooseVolunteerLocation";
const initialForm = {
  name: {
    label: "Username",
    value: "",
    type: "text",
    ph: "שם מלא",
    errorMsg: "",
  },
  email: {
    label: "Email",
    value: "",
    type: "email",
    ph: "דואר אקלטרוני",
    errorMsg: "",
  },
  phoneNumber: {
    label: "phone",
    value: "",
    type: "text",
    ph: "מספר טלפון",
    errorMsg: "",
  },
  // age: {
  //   label: "age",
  //   value: "",
  //   type: "text",
  //   ph: "גיל",
  //   errorMsg: "",
  // },
  password: {
    label: "Password",
    value: "",
    type: "password",
    ph: "סיסמא",
    errorMsg: "",
  },
  confirmedPassword: {
    label: "Password",
    value: "",
    type: "password",
    ph: "אימות סיסמא",
    errorMsg: "",
  },
};

const errorsMsg = {
  name: {
    errorMsg: "",
  },
  email: {
    errorMsg: "",
  },
  phoneNumber: {
    errorMsg: "",
  },
  age: {
    errorMsg: "",
  },
  password: {
    errorMsg: "",
  },
  confirmedPassword: {
    errorMsg: "",
  },
};

const Register = () => {
  function formReducer(prevState, { value, key }) {
    const updatedElement = { ...prevState[key] };
    updatedElement.value = value.trim();
    return { ...prevState, [key]: updatedElement };
  }

  const [state, dispatch] = useReducer(formReducer, initialForm);
  const [errors, setErrors] = useState(errorsMsg);
  const [renderErrorsMessage, setRenderErrorsMessage] = useState(true);
  const [error, setError] = useState();
  const [chooseLocation, setChooseLocation] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState();
  const [volunteerLocation, setVolunteerLocation] = useState([
    {
      regionName: "צפון",
      selected: false,
    },
    {
      regionName: "מרכז",
      selected: false,
    },
    {
      regionName: "ירושלים",
      selected: false,
    },
    {
      regionName: "יהודה ושומרון",
      selected: false,
    },

    {
      regionName: "דרום",
      selected: false,
    },
  ]);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setRenderErrorsMessage(true);
  }, [renderErrorsMessage]);

  const renderInputs = () => {
    return (
      <>
        {Object.keys(state).map((key) => (
          <div key={key}>
            <input
              id={key}
              type={state[key].type}
              value={state[key].value}
              onChange={({ target: { value } }) => dispatch({ value, key })}
              placeholder={state[key].ph}
              required
            />
            {errors[key].errorMsg && (
              <p className="errorMsg">{errors[key].errorMsg}</p>
            )}
          </div>
        ))}
      </>
    );
  };

  const dispatchInputs = () => {
    return renderInputs(state);
  };

  const URL = "http://127.0.0.1:5000/users/newUser";
  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    Object.keys(state).forEach((key) => {
      data[key] = state[key].value;
    });

    // const volunteerLocationArray = [];
    // volunteerLocation.forEach(({ regionName, selected }) => {
    //   if (selected) volunteerLocationArray.push(regionName);
    // });

    data["volunteerLocations"] = selectedRegion;

    if (isValid(state, setRenderErrorsMessage, errors, setErrors))
      try {
        const res = await axios({
          method: "POST",
          url: URL,
          data,
        });
        if (res) {
          setError("");
          // auth.login(res.data);
          localStorage.setItem("userData", JSON.stringify(res.data));
          auth.login(res.data);

          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.msg);
      }
  };

  const renderErrors = () => {
    return (
      <>
        {Object.keys(errors).map((key) => (
          <p key={key}>{errors[key].errorMsg}</p>
        ))}
      </>
    );
  };

  const continueToChooseLocation = (e) => {
    e.preventDefault();

    if (isValid(state, setRenderErrorsMessage, errors, setErrors))
      setChooseLocation(true);
  };

  const handleCheck = ({ regionName }) => {
    setSelectedRegion(regionName);
    // const checkBoxLocation = volunteerLocation;
    // checkBoxLocation[index].selected = !checkBoxLocation[index].selected;
    // setVolunteerLocation([...checkBoxLocation]);
  };

  return (
    <>
      {chooseLocation ? (
        <ChooseVolunteerLocation
          volunteerLocation={volunteerLocation}
          handleCheck={handleCheck}
          onSubmit={onSubmit}
          setChooseLocation={setChooseLocation}
        />
      ) : (
        <>
          {renderErrorsMessage && (
            <Form
              dispatchInputs={dispatchInputs}
              title={"הרשמה"}
              btnText={"המשך"}
              // onSubmit={onSubmit}
              onSubmit={continueToChooseLocation}
              errors={errors}
              renderErrors={renderErrors}
              error={error}
              bottomText={"כבר יש לך משתמש ?"}
              redirect={"/login"}
            />
          )}
        </>
      )}
    </>
  );
};

export default Register;

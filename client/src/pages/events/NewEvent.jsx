import React, { useEffect, useReducer, useState } from "react";
import volunteerApi from "../../apis/volunteerApi";
import AutoCompletePlace from "../../components/autoCompletePlaces/AutoCompletePlace";
import { useAuth } from "../../context/auth-context";
import "./newEvent.css";
import Spinner from "../../components/spinner/Spinner";
import SuccessMsg from "./succsessfulMsg/SuccessMsg";
import DynamicInput from "../../components/dynamicInputs/DynamicInput";
import { initialForm } from "./initalFormState";
import moment from "moment";
moment.locale("he");
const format = "DD/MM/YYYY";
export const NewEvent = () => {
  function formReducer(prevState, { value, key }) {
    const updatedElement = { ...prevState[key] };
    updatedElement.value = value;
    return { ...prevState, [key]: updatedElement };
  }
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
          </div>
        ))}
      </>
    );
  };
  const { user } = useAuth();
  const [eventCreated, setEventCreated] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialForm);
  const [address, setAddress] = useState();
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [eventCoordinates, setEventCoordinates] = useState();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [input, setInput] = useState([
    { title: "", assignedTo: user.user._id },
  ]);

  const [errorMsg, setErrorMsg] = useState(false);
  const [region, setRegion] = useState();

  const validForm = () => {
    const today = new Date();
    const selectedDate = new Date(state.date.value);
    let error = false;
    Object.keys(state).forEach((key) => {
      if (state[key].value.trim().length === 0) error = true;
    });
    if (!address) error = true;

    if (additionalInformation.trim().length === 0) error = true;
    if (state.date.value)
      if (selectedDate < today) {
        setDateError(true);
      } else setDateError(false);

    // for (const key in input) {
    //   if (input[key].title.trim().length === 0) error = true;
    // }

    if (error) {
      setErrorMsg("יש למלא את כל השדות");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const createEvent = async () => {
    if (validForm() && !dateError) {
      setLoading(true);
      try {
        const data = await volunteerApi.post(
          "/events/create",
          {
            eventName: state["eventName"].value,
            date: new Date(state["date"].value),
            dateString: moment(new Date(state["date"].value)).format(format),
            time: state["time"].value,
            address,
            summary: additionalInformation,
            missions: input,
            region,
          },
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        if (data.status === 201) {
          setLoading(false);
          setEventCreated(true);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  };

  return (
    <div className="container-flex-flex-col">
      {eventCreated ? (
        <SuccessMsg />
      ) : (
        <>
          <h2 className="even-title">יצירת אירוע התנדבות</h2>
          <div className="create-event-form">
            <AutoCompletePlace
              setAddress={setAddress}
              setEventCoordinates={setEventCoordinates}
              setRegion={setRegion}
            />
            {renderInputs()}
            <textarea
              className="disable-resize"
              required
              placeholder="אנא רשום פרטים נוספים על ההתנדבות "
              minLength={"2"}
              onChange={({ target }) => {
                setAdditionalInformation(target.value);
              }}
              rows={5}
            ></textarea>

            {/* <DynamicInput input={input} setInput={setInput} user={user} /> */}
            {errorMsg && <p className="errorMsg text-center">{errorMsg}</p>}
            {dateError && (
              <p className="errorMsg text-center">לא ניתן לבחור תאריך עבר</p>
            )}
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={createEvent}
                className="btn btn-primary create-event-btn"
              >
                צור אירוע
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

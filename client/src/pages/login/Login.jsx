import React, { useReducer } from "react";
import axios from "axios";
import Form from "../../components/form/Form";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import volunteerApi from "../../apis/volunteerApi";

const initialForm = {
  email: {
    label: "Email",
    value: "",
    type: "email",
    ph: "דואר אלקטרוני",
  },

  password: {
    label: "Password",
    value: "",
    type: "password",
    ph: "סיסמא",
  },
};
const Login = () => {
  function formReducer(prevState, { value, key }) {
    const updatedElement = { ...prevState[key] };
    updatedElement.value = value;
    return { ...prevState, [key]: updatedElement };
  }

  const [state, dispatch] = useReducer(formReducer, initialForm);
  const auth = useAuth();
  const navigate = useNavigate();

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
              //   autoComplete="off"
            />
          </div>
        ))}
      </>
    );
  };

  const dispatchInputs = () => {
    return renderInputs(state);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    Object.keys(state).forEach((key) => {
      data[key] = state[key].value;
    });

    try {
      const res = await volunteerApi({
        method: "POST",
        url: "/users/login",
        data,
      });
      if (res) {
        // setError("");
        auth.login(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      // setError(error.response.data.msg);
    }
  };
  return (
    <>
      <Form
        dispatchInputs={dispatchInputs}
        onSubmit={onSubmit}
        title={"התחברות"}
        btnText={"התחבר"}
        bottomText={"יצירת חשבון"}
        redirect={"/register"}
      />
    </>
  );
};

export default Login;

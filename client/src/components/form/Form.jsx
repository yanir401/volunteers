import React from "react";
import { Link } from "react-router-dom";

import "./form.css";

const Form = ({
  dispatchInputs,
  title,
  btnText,
  onSubmit,
  error,
  bottomText,
  redirect,
}) => {
  return (
    <div className="container-flex-flex-col form-container form-page-background">
      <form action="" className="container-flex-flex-col" onSubmit={onSubmit}>
        <h2>{title}</h2>
        {dispatchInputs()}
        <button type="submit" className="btn btn-purple">
          {btnText}
        </button>
        {error && <p className="errorMsg">{error}</p>}
        <Link to={`${redirect}`}>{bottomText}</Link>
      </form>
    </div>
  );
};

export default Form;

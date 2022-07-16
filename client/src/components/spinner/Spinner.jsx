import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="align-spinner-center">
      <PuffLoader />
    </div>
  );
};

export default Spinner;

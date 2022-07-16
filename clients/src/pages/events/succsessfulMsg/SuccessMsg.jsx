import React from "react";
import { Link } from "react-router-dom";

const SuccessMsg = () => {
  return (
    <div className="container-flex-flex-col gap-3 mg-tb-3">
      <h3>האירוע נוצר בהצלחה</h3>
      <Link className="btn btn-purple" to={"/"}>
        חזור לדף הבית
      </Link>
    </div>
  );
};

export default SuccessMsg;

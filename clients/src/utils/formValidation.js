import validator from "validator";

export const isValid = (state, setRenderErrorsMessage, errors, setErrors) => {
  Object.keys(state).map((key) => {
    switch (key) {
      case "name":
        if (!state[key].value.trim().match(/^[א-ת]+$/))
          errors[key].errorMsg = "רק אותיות בעברית";
        else errors[key].errorMsg = "";
        break;
      case "email":
        if (!validator.isEmail(state[key].value))
          errors[key].errorMsg = "דואר אלקטרוני לא תקין";
        else errors[key].errorMsg = "";
        break;
      case "phoneNumber":
        if (!validator.isMobilePhone(state[key].value, ["he-IL"]))
          errors[key].errorMsg = "מספר טלפון לא תקין";
        else errors[key].errorMsg = "";
        break;
      case "age":
        if (!state[key].value.trim().match(/^[0-9]+$/))
          errors[key].errorMsg = "רק מספרים";
        else errors[key].errorMsg = "";
        break;
      case "password":
        if (state[key].value.length < 6)
          errors[key].errorMsg = "אורך הסיסמא לפחות 6 תווים";
        else errors[key].errorMsg = "";
        break;
      case "confirmedPassword":
        if (state[key].value !== state["password"].value)
          errors[key].errorMsg = "סיסמאות לא תואמות";
        else errors[key].errorMsg = "";
        break;

      default:
        break;
    }
  });

  setErrors(errors);
  setRenderErrorsMessage(false);

  const arr = [];
  Object.keys(errors).forEach((key) => {
    if (errors[key].errorMsg.length > 0) arr.push(1);
  });
  if (arr.length > 0) return false;
  return true;
};

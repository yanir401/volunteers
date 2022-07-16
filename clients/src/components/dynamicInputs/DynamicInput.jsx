import React from "react";
import { BsTrash } from "react-icons/bs";

const DynamicInput = ({ input, setInput, user }) => {
  const deleteInput = (index) => {
    let inputsArray = input;

    inputsArray = inputsArray.filter((ele, i) => i !== index);
    setInput([...inputsArray]);
  };
  const handleDynamicInputChange = (index, e) => {
    const inputsArray = input;
    inputsArray[index].title = e.target.value;
    setInput([...inputsArray]);
  };
  const handleAddMoreInput = () => {
    const inputsArray = input;
    inputsArray.push({ title: "", assignedTo: user.user._id });
    setInput([...inputsArray]);
  };
  const renderDynamicInputs = () => {
    return input.map((inputElement, index) => {
      return (
        <div className="flex flex-col dynamic-input" key={index}>
          <input
            type="text"
            value={inputElement.title}
            placeholder="רשום כאן"
            onChange={(e) => handleDynamicInputChange(index, e)}
          />
          <BsTrash
            className="removeButton"
            onClick={() => deleteInput(index)}
          />
        </div>
      );
    });
  };
  return (
    <div className="text-center">
      {renderDynamicInputs()}
      <button className="btn btn-lightGreen" onClick={handleAddMoreInput}>
        הוסף עוד
      </button>
    </div>
  );
};

export default DynamicInput;

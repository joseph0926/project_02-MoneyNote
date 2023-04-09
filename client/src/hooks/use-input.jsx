import React, { useState } from "react";

const useInput = (initialState) => {
  const [enteredValue, setEnteredValue] = useState(initialState);
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const valueChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setEnteredValue({ ...enteredValue, [key]: value });
  };
  const valueInputBlurHandler = (e) => {
    setEnteredValueTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };

  return {
    values: enteredValue,
    valueChangeHandler: valueChangeHandler,
    valueInputBlurHandler: valueInputBlurHandler,
    reset: reset,
  };
};

export default useInput;

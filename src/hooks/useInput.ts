import React, { useState } from "react";

const useInput = (validateValue: any) => {
	const [enteredValue, setEnteredValue] = useState<any>("");
	const [isTouched, setIsTouched] = useState<any>(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event: any) => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue("");
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;

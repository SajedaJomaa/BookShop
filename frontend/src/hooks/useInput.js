import { useState } from "react";


export function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);
    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setEdit(false);
    }
    function handleInputBlur() {
        setEdit(true);
    }
    return {
        handleInputBlur,
        handleInputChange,
        value: enteredValue,
        hasError: didEdit && !valueIsValid
    }

}
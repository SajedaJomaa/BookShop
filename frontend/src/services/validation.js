export function isEmail(value) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(value);
    return isValidEmail;
}


export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;


}


export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}
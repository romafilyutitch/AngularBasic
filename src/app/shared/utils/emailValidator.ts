
const emailValidationRegExp = /^\w+@.+\..{2.3}$/;

export const validateEmail = (email: string) => {
    const valid: boolean = emailValidationRegExp.test(email);
    return valid ? null : {invalidEmail: {value: email}};          
}
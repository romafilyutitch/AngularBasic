import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const emailValidationRegExp = /^\w+@.+\..{2,3}$/;

export const validateEmail = (email: string) => {
    if (!email) {
        return null;
    }
    const valid: boolean = emailValidationRegExp.test(email);
    return valid ? null : { invalidEmail: { value: email } };
}

export const createEmailValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        return validateEmail(control.value);
    }
}
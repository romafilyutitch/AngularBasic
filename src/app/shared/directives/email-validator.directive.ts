import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { validateEmail } from '../utils/emailValidator';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl) : ValidationErrors | null {
      return validateEmail(control.value);
  }

}

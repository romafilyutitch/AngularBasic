import { Directive } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
  exportAs: 'passwordToggle'
})
export class PasswordToggleDirective {

  showPassword: boolean = false;

  constructor() {

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}

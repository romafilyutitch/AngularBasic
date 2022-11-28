import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ConfirmModalComponent, HeaderComponent, InfoComponent, SearchComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { FormsModule } from '@angular/forms';
import { PasswordToggleDirective } from './directives/password-toggle.directive';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { DurationPipe } from './pipes/duration.pipe';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ConfirmModalComponent,
  SearchComponent,
]

@NgModule({
  declarations: [...COMPONENTS, DurationPipe, CreationDatePipe, EmailValidatorDirective, PasswordToggleDirective],
  exports: [...COMPONENTS, DurationPipe, CreationDatePipe, EmailValidatorDirective, PasswordToggleDirective],
  imports: [
    CommonModule, FontAwesomeModule, FormsModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ConfirmModalComponent, CourseCardComponent, CourseListComponent, HeaderComponent, InfoComponent, SearchComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { FormsModule } from '@angular/forms';
import { PasswordToggleDirective } from './directives/password-toggle.directive';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { DurationPipe } from './pipes/duration.pipe';

const components = [
  HeaderComponent, 
  ButtonComponent, 
  InfoComponent,
  CourseCardComponent,
  CourseListComponent,
  ConfirmModalComponent,
  SearchComponent, 
]

@NgModule({
  declarations: [...components, DurationPipe, CreationDatePipe, EmailValidatorDirective, PasswordToggleDirective],
  exports: [...components, DurationPipe, CreationDatePipe, EmailValidatorDirective, PasswordToggleDirective],
  imports: [
    CommonModule, FontAwesomeModule, FormsModule
  ]
})
export class SharedModule { }

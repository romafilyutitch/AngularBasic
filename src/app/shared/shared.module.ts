import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ConfirmModalComponent, CourseCardComponent, CourseComponent, CourseListComponent, DurationPipe, HeaderComponent, InfoComponent, LoginComponent, RegistrationComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directives/email-validator.directive';

const components = [
  CourseComponent,
  LoginComponent, 
  RegistrationComponent, 
  HeaderComponent, 
  ButtonComponent, 
  InfoComponent,
  CourseCardComponent,
  DurationPipe,
  CourseListComponent,
  ConfirmModalComponent,
  EmailValidatorDirective
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule, FontAwesomeModule
  ]
})
export class SharedModule { }

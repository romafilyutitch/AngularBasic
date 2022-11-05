import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ConfirmModalComponent, CourseCardComponent, CourseListComponent, DurationPipe, HeaderComponent, InfoComponent, CreationDatePipe } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directives/email-validator.directive';

const components = [
  HeaderComponent, 
  ButtonComponent, 
  InfoComponent,
  CourseCardComponent,
  DurationPipe,
  CreationDatePipe,
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

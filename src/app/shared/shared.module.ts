import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ConfirmModalComponent, CourseCardComponent, CourseListComponent, DurationPipe, HeaderComponent, InfoComponent, CreationDatePipe, SearchComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { FormsModule } from '@angular/forms';

const components = [
  HeaderComponent, 
  ButtonComponent, 
  InfoComponent,
  CourseCardComponent,
  DurationPipe,
  CreationDatePipe,
  CourseListComponent,
  ConfirmModalComponent,
  EmailValidatorDirective,
  SearchComponent
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule, FontAwesomeModule, FormsModule
  ]
})
export class SharedModule { }

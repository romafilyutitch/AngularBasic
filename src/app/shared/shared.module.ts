import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CourseComponent, HeaderComponent, InfoComponent, LoginComponent, RegistrationComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const components = [CourseComponent, LoginComponent, RegistrationComponent, HeaderComponent, ButtonComponent, InfoComponent]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule, FontAwesomeModule
  ]
})
export class SharedModule { }

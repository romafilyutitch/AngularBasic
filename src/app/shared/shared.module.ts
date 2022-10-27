import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent, CoursesComponent, LoginComponent, RegistrationComponent } from './components';

const components = [CourseComponent, LoginComponent, RegistrationComponent]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }

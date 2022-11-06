import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListModule } from '../course-list/course-list.module';


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule, SharedModule, CourseListModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }

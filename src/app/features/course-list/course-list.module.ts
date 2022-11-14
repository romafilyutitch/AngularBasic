import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './course-list.component';
import { CourseCardModule } from '../course-card/course-card.module';


@NgModule({
  declarations: [
    CourseListComponent
  ],
  imports: [
    CommonModule, SharedModule, CourseCardModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseCardComponent } from './course-card.component';


@NgModule({
  declarations: [
    CourseCardComponent
  ],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [CourseCardComponent]
})
export class CourseCardModule { }

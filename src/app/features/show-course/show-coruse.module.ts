import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ShowCourseComponent } from './show-course.component';

const routes: Routes = [
  { path: '', component: ShowCourseComponent }
]

@NgModule({
  declarations: [
    ShowCourseComponent
  ],
  imports: [
    CommonModule, SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [ShowCourseComponent, RouterModule]
})
export class CourseModule { }

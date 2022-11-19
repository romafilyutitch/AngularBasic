import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListModule } from '../course-list/course-list.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CoursesComponent },
]

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule, SharedModule, CourseListModule, RouterModule.forChild(routes)
  ],
  exports: [CoursesComponent, RouterModule]
})
export class CoursesModule { }

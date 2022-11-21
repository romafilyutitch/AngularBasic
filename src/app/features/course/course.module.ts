import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', component: CourseComponent}
]

@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule, SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [CourseComponent, RouterModule]
})
export class CourseModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './features/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { CoursesModule } from './features/courses/courses.module';
import { CourseModule } from './features/course/course.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, LoginModule, RegistrationModule, CoursesModule, CourseModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

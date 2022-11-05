import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesModule } from './features/courses/courses.module';
import { AppComponent } from './app.component';
import { LoginModule } from './features/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { CourseModule } from './features/course/course.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, SharedModule, CoursesModule, LoginModule, RegistrationModule, CourseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

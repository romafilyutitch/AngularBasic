import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const ROUTES: Routes = [
    {path: 'login', loadChildren: () => import('../features/login/login.module').then(m => m.LoginModule)},
    {path: 'registration', loadChildren: () => import('../features/registration/registration.module').then(m => m.RegistrationModule)},
    {path: 'courses', loadChildren: () => import('../features/courses/courses.module').then(m => m.CoursesModule)},
    {path: 'courses/:id', loadChildren: () => import('../features/courses/courses.module').then(m => m.CoursesModule)},
    {path: 'course/add', loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule)},
    {path: 'course/edit/:id', loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule)},
    {path: '', redirectTo: 'courses', pathMatch: 'full'},
    {path: '**', redirectTo: 'courses', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
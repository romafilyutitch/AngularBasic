import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizedGuard } from "../auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "../auth/guards/not-authorized.guard";
import { AdminGuard } from "../user/guards/admin.guard";

const ROUTES: Routes = [
    { path: 'login', loadChildren: () => import('../features/login/login.module').then(m => m.LoginModule), canActivate: [NotAuthorizedGuard] },
    { path: 'registration', loadChildren: () => import('../features/registration/registration.module').then(m => m.RegistrationModule), canActivate: [NotAuthorizedGuard] },
    { path: 'courses', loadChildren: () => import('../features/courses/courses.module').then(m => m.CoursesModule), canActivate: [AuthorizedGuard] },
    { path: 'courses/:id', loadChildren: () => import('../features/show-course/show-coruse.module').then(m => m.CourseModule), canActivate: [AuthorizedGuard] },
    { path: 'course/add', loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule), canActivate: [AuthorizedGuard, AdminGuard] },
    { path: 'courses/edit/:id', loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule), canActivate: [AuthorizedGuard, AdminGuard] },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', redirectTo: '/courses', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES), HttpClientModule],
    exports: [RouterModule],
    providers: [{ provide: 'Window', useValue: window }]
})
export class AppRoutingModule { }
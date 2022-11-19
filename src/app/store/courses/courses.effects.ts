import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, combineLatest, forkJoin, map, mergeMap, Observable, of, tap } from "rxjs";
import { Author } from "src/app/services/author.model";
import { Course } from "src/app/services/course.model";
import { CoursesService } from "src/app/services/courses.service";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { requestAllCourses, requestAllCoursesFail, requestAllCoursesSuccess, requestCreateCourse, requestCreateCourseFail, requestCreateCourseSuccess, requestDeleteCourse, requestDeleteCourseFail, requestEditCoruseSuccess, requestEditCourse, requestEditCourseFail, requestFilteredCourses, requestFilteredCoursesFail, requestFilteredCoursesSuccess, requestSingleCourse, requestSingleCourseFail, requestSingleCourseSuccess } from "./courses.actions";

export class CorusesEffects {

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(requestAllCourses),
        mergeMap(() => combineLatest([this.coursesService.getAll(), this.authorsStateFacade.authors$]).pipe(
            map(([courses, authors]) => {
                this.mergeCoursesWithAuthors(courses, authors);
                return requestAllCoursesSuccess({courses})
            }),
            catchError((error) => of(requestAllCoursesFail({errorMessage: error.errorMessage})))
        ))
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(requestFilteredCourses),
        mergeMap((action) => this.coursesStateFacade.allCourses$.pipe(
            map(coruses => {
                const filteredCoruses = courses.filter(course => course.title === action.title);
                return requestFilteredCoursesSuccess({courses: filteredCoruses});
            }),
            catchError(error => of(requestFilteredCoursesFail({errorMessage: error.errorMessage})))
        ))
    ));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestSingleCourse),
        mergeMap((action) => combineLatest([this.coursesService.getCourse(action.courseId), this.authorsStateFacade.authors$]).pipe(
            map(([course, authors]) => {
                this.mergetCourseWithAuthors(course, authors);
                return requestSingleCourseSuccess({course});
            }),
            catchError(error => of(requestSingleCourseFail({errorMessage: error.errorMessage})))
        ))
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestDeleteCourse),
        mergeMap(action => this.coursesService.deleteCourse(action.course).pipe(
            map(() => requestAllCourses()),
            catchError(error => of(requestDeleteCourseFail({errorMessage: error.errorMessage})))
        ))
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestEditCourse),
        mergeMap(action => this.coursesService.editCourse(action.course).pipe(
            map(course => requestEditCoruseSuccess({course})),
            catchError(error => of(requestEditCourseFail({errorMessage: error.errorMessage})))
        )),
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestCreateCourse),
        mergeMap(action => this.coursesService.createCourse(action.course).pipe(
            map(course => requestCreateCourseSuccess({course})),
            catchError(error => of(requestCreateCourseFail({errorMessage: error.errorMessage})))
        ))
    ));

    reditectToTheCoursePage$ = createEffect(() => this.actions$.pipe(
        ofType(requestCreateCourseSuccess, requestEditCoruseSuccess, requestSingleCourseFail),
        tap(() => this.router.navigateByUrl('/courses'))
    ), {dispatch: false})

    constructor(private actions$: Actions, 
        private coursesService: CoursesService, 
        private authorsStateFacade: AuthorsStateFacade,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router) {}

    private mergeCoursesWithAuthors(courses: Course[], authors: Author[]): void {
        courses.forEach(course => course.authors = authors.filter(author => course.authors.includes(author.id)).map(author => author.name));
    }

    private mergetCourseWithAuthors(course: Course, authors: Author[]): void {
        course.authors = authors.filter(author => course.authors.includes(author.id)).map(author => author.name);
    }
}
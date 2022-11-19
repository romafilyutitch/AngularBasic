import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { bufferCount, catchError, combineLatest, concat, map, mergeMap, Observable, of, tap } from "rxjs";
import { Author } from "src/app/services/author.model";
import { AuthorsService } from "src/app/services/authors.service";
import { Course } from "src/app/services/course.model";
import { CoursesService } from "src/app/services/courses.service";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { requestAllCourses, requestAllCoursesFail, requestAllCoursesSuccess, requestCreateCourse, requestCreateCourseFail, requestCreateCourseSuccess, requestDeleteCourse, requestDeleteCourseFail, requestEditCourseSuccess, requestEditCourse, requestEditCourseFail, requestFilteredCourses, requestFilteredCoursesFail, requestFilteredCoursesSuccess, requestSingleCourse, requestSingleCourseFail, requestSingleCourseSuccess } from "./courses.actions";
import { CoursesStateFacade } from "./courses.facade";

@Injectable({
    providedIn: 'root'
})
export class CorusesEffects {

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(requestAllCourses),
        mergeMap(() => combineLatest([this.coursesService.getAll(), this.authorsStateFacade.authors$]).pipe(
            map(([courses, authors]) => {
                this.mergeCoursesWithAuthors(courses, authors);
                return requestAllCoursesSuccess({ courses })
            }),
            catchError((error) => of(requestAllCoursesFail({ errorMessage: error.errorMessage })))
        ))
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(requestFilteredCourses),
        mergeMap((action) => combineLatest([this.coursesService.searchCourse(action.title), this.authorsStateFacade.authors$]).pipe(
            map(([courses, authors]) => {
                this.mergeCoursesWithAuthors(courses, authors);
                return requestFilteredCoursesSuccess({ courses });
            }),
            catchError(error => of(requestFilteredCoursesFail({ errorMessage: error.errorMessage })))
        ))));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestSingleCourse),
        mergeMap((action) => combineLatest([this.coursesService.getCourse(action.courseId), this.authorsStateFacade.authors$]).pipe(
            map(([course, authors]) => {
                this.mergeCourseWithAuthors(course, authors);
                return requestSingleCourseSuccess({ course });
            }),
            catchError(error => of(requestSingleCourseFail({ errorMessage: error.errorMessage })))
        ))
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestDeleteCourse),
        mergeMap(action => this.coursesService.deleteCourse(action.course).pipe(
            map(() => requestAllCourses()),
            catchError(error => of(requestDeleteCourseFail({ errorMessage: error.errorMessage })))
        ))
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestEditCourse),
        mergeMap(action => {
            const courseAuthors: Observable<Author>[] = action.course.authors.map(author => this.authorsService.addAuthor({ name: author }));
            return concat(...courseAuthors).pipe(
                bufferCount(action.course.authors.length),
                mergeMap(authors => {
                    const course: Course = { ...action.course };
                    course.authors = authors.map(author => author.id);
                    return this.coursesService.editCourse(course);
                }),
                map(course => {
                    course.authors = action.course.authors;
                    return requestEditCourseSuccess({ course });
                }),
                catchError(errorResponse => of(requestEditCourseFail({ errorMessage: errorResponse })))
            )
        }),

    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestCreateCourse),
        mergeMap(action => {
            const courseAuthors: Observable<Author>[] = action.course.authors.map(author => this.authorsService.addAuthor({ name: author }));
            return concat(...courseAuthors).pipe(
                bufferCount(action.course.authors.length),
                mergeMap(authors => {
                    const course: Course = { ...action.course };
                    course.authors = authors.map(author => author.id);
                    return this.coursesService.createCourse(course);
                }),
                map(course => {
                    course.authors = action.course.authors;
                    return requestCreateCourseSuccess({ course })
                }),
                catchError(errorResponse => of(requestCreateCourseFail({ errorMessage: errorResponse })))
            )
        }),

    ));

    reditectToTheCoursePage$ = createEffect(() => this.actions$.pipe(
        ofType(requestCreateCourseSuccess, requestEditCourse, requestSingleCourseFail),
        tap(() => this.router.navigateByUrl('/courses'))
    ), { dispatch: false })

    constructor(private actions$: Actions,
        private coursesService: CoursesService,
        private authorsStateFacade: AuthorsStateFacade,
        private coursesStateFacade: CoursesStateFacade,
        private authorsService: AuthorsService,
        private router: Router) { }

    private mergeCoursesWithAuthors(courses: Course[], authors: Author[]): void {
        courses.forEach(course => this.mergeCourseWithAuthors(course, authors));
    }

    private mergeCourseWithAuthors(course: Course, authors: Author[]): void {
        course.authors = course.authors.map(authorId => authors.find(author => author.id === authorId).name);
    }
}
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Course } from "src/app/services/course.model";
import { State } from "..";
import { requestAllCourses, requestCreateCourse, requestDeleteCourse, requestEditCourse, requestFilteredCourses, requestSingleCourse } from "./courses.actions";
import { getAllCourses, getCourse, getCourses, getErrorMessage, isAllCoursesLoadingSelector, isSearchingStateSelector, isSingleCourseLoadingSelector } from "./courses.selector";

@Injectable({
    providedIn:'root'
})
export class CoursesStateFacade {
    
    public isAllCoursesLoading$ = this.store.pipe(select(isAllCoursesLoadingSelector));
    public isSingleCourseLoading$ = this.store.pipe(select(isSingleCourseLoadingSelector));
    public isSearchingState$ = this.store.pipe(select(isSearchingStateSelector));
    public courses$ = this.store.pipe(select(getCourses));
    public allCourses$ = this.store.pipe(select(getAllCourses));
    public course$ = this.store.pipe(select(getCourse));
    public errorMessage$ = this.store.pipe(select(getErrorMessage));

    constructor(private store: Store<State>) {}

    getAllCourses(): void {
        this.store.dispatch(requestAllCourses());
    }

    getSingleCourse(courseId: string) {
        this.store.dispatch(requestSingleCourse({courseId}));
    } 

    getFilteredCourses(title: string) {
        this.store.dispatch(requestFilteredCourses({title}))
    }

    editCourse(course: Course) {
        this.store.dispatch(requestEditCourse({course}));
    }

    createCourse(course: Course) {
        this.store.dispatch(requestCreateCourse({course}));
    }

    deleteCourse(course: Course) {
        this.store.dispatch(requestDeleteCourse({course}));
    }
}
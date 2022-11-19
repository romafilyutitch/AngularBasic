import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Course } from "src/app/services/course.model";
import { requestAllCourses, requestCreateCourse, requestDeleteCourse, requestEditCourse, requestFilteredCourses, requestSingleCourse } from "./courses.actions";
import { CoursesState } from "./courses.reducers";
import { getAllCourses, getCourse, getErrorMessage, isAllCoursesLoadingSelector, isSearchingStateSelector, isSingleCourseLoadingSelector } from "./courses.selector";

@Injectable({
    providedIn:'root'
})
export class CoursesStateFacade {
    
    public isAllCoursesLoading$ = this.store.select(isAllCoursesLoadingSelector);
    public isSingleCourseLoading$ = this.store.select(isSingleCourseLoadingSelector);
    public isSearchingState$ = this.store.select(isSearchingStateSelector);
    public courses$ = this.store.select(getAllCourses);
    public course$ = this.store.select(getCourse);
    public errorMessage$ = this.store.select(getErrorMessage);

    constructor(private store: Store<CoursesState>) {}

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
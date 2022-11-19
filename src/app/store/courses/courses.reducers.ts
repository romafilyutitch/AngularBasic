import { Course } from "src/app/services/course.model";
import { createReducer, on } from "@ngrx/store";
import { requestAllCourses, requestAllCoursesFail, requestAllCoursesSuccess, requestCreateCourse, requestCreateCourseFail, requestCreateCourseSuccess, requestDeleteCourse, requestDeleteCourseFail, requestEditCoruseSuccess, requestEditCourse, requestEditCourseFail, requestFilteredCourses, requestFilteredCoursesFail, requestFilteredCoursesSuccess, requestSingleCourse, requestSingleCourseFail, requestSingleCourseSuccess } from "./courses.actions";

export const coursesFeatureKey: string = 'courses';

export interface CoursesState {
    allCourses: Course[];
    courses: Course[];
    course: Course;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: [],
    courses: [],
    course: {id: '', authors: [], description: '', duration: 0, title: '', creationDate: ''},
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export const reducer = createReducer(
    initialState,
    on(requestAllCourses, state => ({
        ...state,
        isAllCoursesLoading : true
    })),
    on(requestAllCoursesSuccess, (state, action) => ({
        ...state,
        isAllCoursesLoading: false,
        allCourses: action.courses
    })),
    on(requestAllCoursesFail, (state, action) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: action.errorMessage
    })),
    on(requestSingleCourse, state => ({
        ...state,
        isSingleCourseLoading: true
    })),
    on(requestSingleCourseSuccess, (state, action) => ({
        ...state,
        isSingleCourseLoading: false,
        course: action.course
    })),
    on(requestSingleCourseFail, (state, action) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: action.errorMessage
    })),
    on(requestFilteredCourses, state => ({
        ...state,
        isSearchState: true
    })),
    on(requestFilteredCoursesSuccess, (state, action) => ({
        ...state,
        isSearchState: false,
        courses: action.courses
    })),
    on(requestFilteredCoursesFail, (state, action) => ({
        ...state,
        isSearchState: false,
        errorMessage: action.errorMessage
    })),
    on(requestDeleteCourse, state => state),
    on(requestDeleteCourseFail, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage
    })),
    on(requestEditCourse, state => state),
    on(requestEditCoruseSuccess, (state, action) => ({
        ...state,
        allCourses: state.allCourses.map(course => course.id === action.course.id ? action.course : course)
    })),
    on(requestEditCourseFail, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage
    })),
    on(requestCreateCourse, state => state),
    on(requestCreateCourseSuccess, (state, action) => ({
        ...state,
        allCourses: [...state.allCourses, action.course]
    })),
    on(requestCreateCourseFail, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage
    }))
)
    


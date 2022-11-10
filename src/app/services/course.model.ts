export interface Course {
    id?: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

export interface CoursesResponse {
    success: boolean;
    result: Course[];
}

export interface CourseResponse {
    success: boolean;
    result: Course;
}
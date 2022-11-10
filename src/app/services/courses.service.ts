import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course, CourseResponse, CoursesResponse } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.httpClient.get<CoursesResponse>('http://localhost:4000/courses/all')
    .pipe(map(response => response.result));
  }

  searchCourse(title?: string, description?: string, creationDate?: string, duration?: number): Observable<Course[]> {
    const searchParams: HttpParams = new HttpParams()
    .append('title', title)
    .append('description', description)
    .append('creationDate', creationDate)
    .append('duration', duration);
    return this.httpClient.get<CoursesResponse>('http://localhost:4000/courses/filter', {
      params: searchParams
    }).pipe(map(response => response.result));
  }

  getCourse(id: string): Observable<Course> {
    return this.httpClient.get<CourseResponse>(`http://localhost:4000/courses/${id}`)
    .pipe(map(response => response.result));
  }

  createCourse(course: Course): Observable<any> {
    return this.httpClient.post('http://localhost:4000/courses/add', course);
  }

  editCourse(course: Course): Observable<any> {
    return this.httpClient.put(`http://localhost:4000/courses/${course.id}`, course);
  }

  deleteCourse(course: Course): Observable<any> {
    return this.httpClient.delete(`http://localhost:4000/courses/${course.id}`);
  }

}

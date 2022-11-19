import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { SessionStorageService } from '../auth/session-storage.service';
import { Course, CourseResponse, CoursesResponse } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  getAll(): Observable<Course[]> {
    return this.httpClient.get<CoursesResponse>('http://localhost:4000/courses/all')
    .pipe(
      first(),
      map(response => response.result)
      );
  }

  searchCourse(title: string): Observable<Course[]> {
    const searchParams: HttpParams = new HttpParams().append('title', title);
    return this.httpClient.get<CoursesResponse>('http://localhost:4000/courses/filter', {params: searchParams})
    .pipe(
      first(),
      map(response => response.result)
      );
  }

  getCourse(id: string): Observable<Course> {
    return this.httpClient.get<CourseResponse>(`http://localhost:4000/courses/${id}`)
    .pipe(
      first(),
      map(response => response.result)
      );
  }

  createCourse(course: Course): Observable<Course> {
    return this.httpClient.post<CourseResponse>('http://localhost:4000/courses/add', course).pipe(first(), map(response => response.result));
  }

  editCourse(course: Course): Observable<Course> {
    return this.httpClient.put<CourseResponse>(`http://localhost:4000/courses/${course.id}`, course).pipe(first(), map(response => response.result));
  }

  deleteCourse(course: Course): Observable<any> {
    return this.httpClient.delete(`http://localhost:4000/courses/${course.id}`).pipe(first());
  }

}

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SessionStorageService } from '../auth/session-storage.service';
import { Course, CourseResponse, CoursesResponse } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  getAll(): Observable<Course[]> {
    return this.httpClient.get<CoursesResponse>('http://localhost:4000/courses/all')
    .pipe(map(response => response.result));
  }

  searchCourse(title: string): Observable<Course[]> {
    const searchParams: HttpParams = new HttpParams().append('title', title);
    return this.httpClient.get<CoursesResponse>('http://localhost:4000/courses/filter', {
      params: searchParams
    }).pipe(map(response => response.result));
  }

  getCourse(id: string): Observable<Course> {
    return this.httpClient.get<CourseResponse>(`http://localhost:4000/courses/${id}`)
    .pipe(map(response => response.result));
  }

  createCourse(course: Course): Observable<any> {
    const requestHeaders: HttpHeaders = new HttpHeaders().append('Authorization', this.sessionStorageService.getToken());
    return this.httpClient.post('http://localhost:4000/courses/add', course, {headers: requestHeaders});
  }

  editCourse(course: Course): Observable<any> {
    const requestHeaders: HttpHeaders = new HttpHeaders().append('Authorization', this.sessionStorageService.getToken());
    return this.httpClient.put(`http://localhost:4000/courses/${course.id}`, course, {headers: requestHeaders});
  }

  deleteCourse(course: Course): Observable<any> {
    const requestHeaders: HttpHeaders = new HttpHeaders().append('Authorization', this.sessionStorageService.getToken());
    return this.httpClient.delete(`http://localhost:4000/courses/${course.id}`, {headers: requestHeaders});
  }

}

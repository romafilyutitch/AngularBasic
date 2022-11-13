import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { SessionStorageService } from '../auth/session-storage.service';
import { Author, AuthorResponseBody } from './author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  getAll(): Observable<Author[]> {
    return this.httpClient.get<AuthorResponseBody>('http://localhost:4000/authors/all').pipe(
      first(),
      map(response => response.result)
      );
  }

  addAuthor(author: Author): Observable<any> {
    return this.httpClient.post('http://localhost:4000/authors/add', author).pipe(first());
  }
}

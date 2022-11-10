import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserResponse } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User> {
    return this.httpClient.get<UserResponse>('http://localhost:4000/users/me')
    .pipe(map(response => response.result));
  }
}

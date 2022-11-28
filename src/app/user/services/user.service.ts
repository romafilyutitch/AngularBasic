import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/auth/session-storage.service';
import { User, UserResponse } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  getUser(): Observable<User> {
    return this.httpClient.get<UserResponse>('http://localhost:4000/users/me')
      .pipe(
        first(),
        map(response => response.result)
      );
  }
}

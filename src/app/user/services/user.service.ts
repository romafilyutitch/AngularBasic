import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/auth/session-storage.service';
import { User, UserResponse } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  getUser(): Observable<User> {
    let requestHeaders = new HttpHeaders();
    if (this.sessionStorageService.getToken()){
      requestHeaders = requestHeaders.append('Authorization', this.sessionStorageService.getToken());
    }
    return this.httpClient.get<UserResponse>('http://localhost:4000/users/me', {headers : requestHeaders})
    .pipe(map(response => response.result));
  }
}

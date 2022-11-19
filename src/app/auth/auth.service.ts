import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { AuthResponse } from './auth.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('http://localhost:4000/login', user).pipe(first(),
      tap(response => {
        this.sessionStorageService.setToken(response.result)
      })
    );
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('http://localhost:4000/register', user).pipe(first());
  }

  logout(): void {
    this.httpClient.delete('http://localhost:4000/logout')
      .pipe(first())
      .subscribe(() => {
        this.isAuthorized$$.next(false);
        this.sessionStorageService.deleteToken();
      });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AuthResponse} from './auth.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  login(user: User): void {
    this.httpClient.post<AuthResponse>('http://localhost:4000/login', user)
      .subscribe(
        response => {
        this.sessionStorageService.setToken(response.result);
        this.isAuthorized$$.next(response.successful);
      }, 
      () => {
        this.isAuthorized$$.next(false);
      })
  }

  register(user: User): void {
    this.httpClient.post<AuthResponse>('http://localhost:4000/register', user).subscribe();
  }

  logout(): void {
    if (this.sessionStorageService.getToken()) {
      const logoutRequestHeaders = new HttpHeaders().append('Authorization', this.sessionStorageService.getToken());
      this.httpClient.delete('http://localhost:4000/logout', {headers: logoutRequestHeaders})
      .subscribe(() => {
        this.isAuthorized$$.next(false);
        this.sessionStorageService.deleteToken();
      });
    }
  }
  
}

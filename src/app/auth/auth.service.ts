import { Injectable, ɵisObservable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, catchError, first, from, Observable, throwError } from 'rxjs';
import { AuthResponse} from './auth.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthorized$: Observable<boolean> = from(this.isAuthorized$$);

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  login(user: User): void {
    this.httpClient.post<AuthResponse>('http://localhost:4000', user)
    .pipe(
      first(),
      catchError(this.handleError)
      )
      .subscribe(response => {
        this.sessionStorageService.setToken(response.result);
        this.isAuthorized$$.next(response.successfull);
      })
  }

  register(user: User): void {
    this.httpClient.post('http://localhost:4000', user)
    .pipe(
      first(),
      catchError(this.handleError)
      );
  }

  logout(): void {
    const logoutRequestHeaders = new HttpHeaders().set('Authorization', this.sessionStorageService.getToken());
    this.httpClient.delete('http://localhost:4000', {headers: logoutRequestHeaders})
    .pipe(
      first(),
      catchError(this.handleError)
      )
    .subscribe(() => {
      this.sessionStorageService.deleteToken()
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('An data error occured, please try again');
  }
  
}

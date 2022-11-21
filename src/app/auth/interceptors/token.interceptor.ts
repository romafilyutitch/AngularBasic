import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionStorageService: SessionStorageService, private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestToken = this.sessionStorageService.getToken();
    let modifiedRequest = requestToken ? request.clone({headers: request.headers.set('Authorization', requestToken)}) : request;
    return next.handle(modifiedRequest).pipe(
      tap({
        next: event => {},
        error: error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.authService.logout();
            this.router.navigateByUrl('/login')
          }
        }
      })
    );
  }
}
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
    request.headers.append('Authorization', this.sessionStorageService.getToken());
    return next.handle(request).pipe(
      tap(
        (event) => {
         if (event instanceof HttpErrorResponse && event.status === 401) {
          this.authService.logout();
          this.router.navigateByUrl('/login')
         } 
        }
      )
    );
  }
}

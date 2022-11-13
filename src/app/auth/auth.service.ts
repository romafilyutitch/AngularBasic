import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, first, Observable } from 'rxjs';
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
    .pipe(first())
    .subscribe({
      next: response => {
        this.sessionStorageService.setToken(response.result);
        this.isAuthorized$$.next(response.successful);
      },
      error: error => {
        this.isAuthorized$$.next(false);
      }
    })
  }

  register(user: User): void {
    this.httpClient.post<AuthResponse>('http://localhost:4000/register', user)
    .pipe(first())
    .subscribe();
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

import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private tokenItemKey: string = 'token';

  constructor(@Inject('Window') private window: Window) { }

  setToken(token: string) {
    this.window.sessionStorage.setItem(this.tokenItemKey, token);
  }

  getToken(): string {
    return this.window.sessionStorage.getItem(this.tokenItemKey);
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(this.tokenItemKey);
  }
}

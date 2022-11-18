import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/user/user.model";
import { SessionStorageService } from "../session-storage.service";
import { requestLogin, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegister } from "./auth.actions";
import { AuthState } from "./auth.reducer";

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {

    
    constructor(private store: Store<AuthState>, private sessionStorageService: SessionStorageService) {}

    login(body: User) {
        this.store.dispatch(requestLogin(body));
    }

    register(body: User) {
        this.store.dispatch(requestRegister(body));
    }

    logout() {
        this.store.dispatch(requestLogout());
    }

    closeSession() {
        this.store.dispatch(requestLogoutSuccess());
    }

    setAuthorization() {
        this.store.dispatch(requestLoginSuccess({token: this.sessionStorageService.getToken()}));
    }


}
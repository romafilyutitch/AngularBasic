import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "src/app/store";
import { User } from "src/app/user/user.model";
import { SessionStorageService } from "../session-storage.service";
import { requestLogin, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegister } from "./auth.actions";
import { getSpecificErrorMessage, getToken, isUserAuthorized } from "./auth.selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {

    public isAuthorized$: Observable<boolean> = this.store.pipe(select(isUserAuthorized));
    public getToken$: Observable<string> = this.store.pipe(select(getToken));
    public getLoginErrorMessage: Observable<string> = this.store.pipe(select(getSpecificErrorMessage))
    public getRegisterErrorMessage: Observable<string> = this.store.pipe(select(getSpecificErrorMessage))

    constructor(private store: Store<State>, private sessionStorageService: SessionStorageService) { }

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
        this.store.dispatch(requestLoginSuccess({ token: this.sessionStorageService.getToken() }));
    }


}
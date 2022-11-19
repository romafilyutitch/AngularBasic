import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { requestLogin, requestLoginFail, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegister, requestRegisterFail, requestRegisterSuccess } from "./auth.actions";

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {

    public login$ = createEffect(() => this.actions$.pipe(
        ofType(requestLogin),
        mergeMap((user) => this.authService.login(user).pipe(
            map((response => requestLoginSuccess({ token: response.result }))),
            catchError((errorResponse) => of(requestLoginFail({ errorMessage: errorResponse.error.result })))
        ))
    ));

    public register$ = createEffect(() => this.actions$.pipe(
        ofType(requestRegister),
        mergeMap((user) => this.authService.register(user).pipe(
            map(() => requestRegisterSuccess()),
            catchError((errorResponse) => of(requestRegisterFail({ errorMessage: errorResponse.error.result })))
        ))
    ));

    public logout$ = createEffect(() => this.actions$.pipe(
        ofType(requestLogout),
        tap(() => this.authService.logout()),
        map(() => requestLogoutSuccess())
    ));

    constructor(private actions$: Actions, private authService: AuthService) { }
}
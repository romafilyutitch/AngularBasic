import { Actions, ofType } from "@ngrx/effects";
import { catchError, map, merge, mergeMap, Observable, of, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { requestLogin, requestLoginFail, requestLoginSuccess, requestLogout, requestRegister, requestRegisterFail, requestRegisterSuccess } from "./auth.actions";

export class AuthEffects {

    public login$ = this.actions$.pipe(
        ofType(requestLogin),
        mergeMap((user) => this.authService.login(user).pipe(
            map((response => requestLoginSuccess({token: response.result}))),
            catchError((error) => of(requestLoginFail({errorMessage: error.errorMessage})))
        ))
    );

    public register = this.actions$.pipe(
        ofType(requestRegister),
        mergeMap((user) => this.authService.register(user).pipe(
            map(response => requestRegisterSuccess()),
            catchError((error) => of(requestRegisterFail({errorMessage: error.errorMessage})))
        ))
    );

    public logout$ = this.actions$.pipe(
        ofType(requestLogout),
        tap(() => this.authService.logout())
    )

    constructor(private actions$: Actions, private authService: AuthService) {}
}
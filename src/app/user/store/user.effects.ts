import {UserService} from "../services/user.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {requestCurrentUser, requestCurrentUserFail, requestCurrentUserSuccess} from "./user.actions";
import {mergeMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

export class CurrentUserEffects {

    getCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(requestCurrentUser),
        mergeMap(() => this.userService.getUser()
        .pipe(
            map(user => requestCurrentUserSuccess(user)),
            catchError(() => of(requestCurrentUserFail()))
        ))
    ))

    constructor(private actions$: Actions ,private userService: UserService) {}

}
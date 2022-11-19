import { AuthorsService } from './../../services/authors.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { reqeustAuthorsSuccess, requestAddAuthor, requestAddAuthorFail, requestAddAuthorSuccess, requestAuthors, requestAuthorsFail } from './authors.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorsEffects {

    public getAuthors$ = createEffect(() => this.actions$.pipe(
        ofType(requestAuthors),
        mergeMap(() => this.authorService.getAll().pipe(
            map(authors => reqeustAuthorsSuccess({ authors })),
            catchError(() => of(requestAuthorsFail()))
        ))
    ));

    public addAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(requestAddAuthor),
        mergeMap(author => this.authorService.addAuthor(author).pipe(
            map(author => requestAddAuthorSuccess({ addedAuthor: author })),
            catchError(() => of(requestAddAuthorFail()))
        ))
    ));

    constructor(private actions$: Actions, private authorService: AuthorsService) { }
}
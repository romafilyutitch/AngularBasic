import {AuthorsService} from './../../services/authors.service';
import {Actions, ofType} from '@ngrx/effects'; 
import { reqeustAuthorsSuccess, requestAddAuthor, requestAddAuthorFail, requestAddAuthorSuccess, requestAuthors, requestAuthorsFail } from './authors.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export class AuthorsEffects {

    public getAuthors$ = this.actions$.pipe(
        ofType(requestAuthors),
        mergeMap(() => this.authorService.getAll().pipe(
            map(authors => reqeustAuthorsSuccess({authors})),
            catchError(() => of(requestAuthorsFail()))
        ))
    );

    public addAuthor$ = this.actions$.pipe(
        ofType(requestAddAuthor),
        mergeMap(author => this.authorService.addAuthor(author).pipe(
            map(author => requestAddAuthorSuccess({addedAuthor: author})),
            catchError(() => of(requestAddAuthorFail()))
        ))
    );

    constructor(private actions$: Actions, private authorService: AuthorsService) {}
}
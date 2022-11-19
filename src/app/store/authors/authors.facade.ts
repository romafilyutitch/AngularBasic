import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "..";
import { Author } from "../../services/author.model";
import { requestAddAuthor, requestAuthors } from "./authors.actions";
import { getAddedAuthor, getAuthors } from "./authors.selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthorsStateFacade {

    authors$: Observable<Author[]> = this.store.pipe(select(getAuthors));
    addedAuthor$: Observable<Author> = this.store.pipe(select(getAddedAuthor));

    constructor(private store: Store<State>) {}

    getAuthors(): void {
        this.store.dispatch(requestAuthors());
    }

    addAuthor(author: Author): void {
        this.store.dispatch(requestAddAuthor(author));
    }
}
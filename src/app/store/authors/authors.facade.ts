import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Author } from "../../services/author.model";
import { requestAddAuthor, requestAuthors } from "./authors.actions";
import { AuthorsState } from "./authors.reducer";
import { getAddedAuthor, getAuthors } from "./authors.selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthorsStateFacade {

    authors$: Observable<Author[]> = this.store.select(getAuthors);
    addedAuthor$: Observable<Author> = this.store.select(getAddedAuthor);

    constructor(private store: Store<AuthorsState>) {}

    getAuthors(): void {
        this.store.dispatch(requestAuthors());
    }

    addAuthor(author: Author): void {
        this.store.dispatch(requestAddAuthor(author));
    }
}
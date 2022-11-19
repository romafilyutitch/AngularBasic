import {Injectable} from "@angular/core";
import {select, Store} from '@ngrx/store';
import { requestCurrentUser } from "./user.actions";
import { getName, isAdmin } from "./user.selectors";
import { Observable } from "rxjs";
import { State } from "src/app/store";

@Injectable({
    providedIn: 'root'
})
export class UserStateFacade {
    
    public name$: Observable<string> = this.store.pipe(select(getName));
    public isAdmin$: Observable<boolean> = this.store.pipe(select(isAdmin));

    constructor(private store: Store<State>) {}

    getCurrentUser(): void {
        this.store.dispatch(requestCurrentUser());
    }
}
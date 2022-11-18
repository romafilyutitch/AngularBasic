import {Injectable} from "@angular/core";
import {UserState} from "./user.reducer";
import {Store} from '@ngrx/store';
import { requestCurrentUser } from "./user.actions";
import { getName, isAdmin } from "./user.selectors";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserStateFacade {
    
    public name$: Observable<string> = this.store.select(getName);
    public isAdmin$: Observable<boolean> = this.store.select(isAdmin);

    constructor(private store: Store<UserState>) {}


    getCurrentUser(): void {
        this.store.dispatch(requestCurrentUser());
    }
}
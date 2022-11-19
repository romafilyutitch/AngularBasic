import { Action, createReducer, on } from '@ngrx/store';
import {Author} from './../../services/author.model';
import { reqeustAuthorsSuccess, requestAddAuthor, requestAddAuthorFail, requestAddAuthorSuccess, requestAuthors, requestAuthorsFail, resetAddedAuthor } from './authors.actions';

export const authorsFeatureKey: string = 'authors';

export interface AuthorsState {
    authors: Author[];
    addedAuthor: Author;
};

export const initialState: AuthorsState = {
    authors: [],
    addedAuthor: {name: '', id :''} 
};

export const reducer = createReducer(
    initialState,
    on(requestAuthors, state => state),
    on(reqeustAuthorsSuccess, (state, action) => ({
       ...state,
       authors: action.authors
    })),
    on(requestAuthorsFail, state => state),
    on(requestAddAuthor, state => state),
    on(requestAddAuthorSuccess, (state, action) => ({
        authors: [...state.authors, action.addedAuthor],
        addedAuthor: action.addedAuthor
    })),
    on(requestAddAuthorFail, state => state),
    on(resetAddedAuthor, state => state)
);

export const AuhorsReducer = (state: AuthorsState, action: Action) => reducer(state, action);
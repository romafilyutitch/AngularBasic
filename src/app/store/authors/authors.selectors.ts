import { createSelector } from "@ngrx/store";
import { State } from "..";
import { AuthorsState } from "./authors.reducer";

const selectAuthorsState = (state: State) => state.authors;

export const getAddedAuthor = createSelector(selectAuthorsState, (state: AuthorsState) => state.addedAuthor);
export const getAuthors = createSelector(selectAuthorsState, (state: AuthorsState) => state.authors);
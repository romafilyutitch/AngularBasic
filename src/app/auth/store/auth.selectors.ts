import { createSelector, select } from "@ngrx/store";
import { State } from "src/app/store";
import { AuthState } from "./auth.reducer";

const selectAuth = (state: State) => state.auth;

export const isUserAuthorized = createSelector(selectAuth,(state: AuthState) => state.isAuthorized);
export const getToken = createSelector(selectAuth, (state: AuthState) => state.token);
export const getSpecificErrorMessage = createSelector(selectAuth, (state: AuthState) => state.errorMessage);
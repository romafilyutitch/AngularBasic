import { createSelector } from '@ngrx/store';
import { State } from 'src/app/store';
import { UserState } from './user.reducer';

const selectUserState = (state: State) => state.user;

export const getName = createSelector(selectUserState, (state: UserState) => state.name);
export const isAdmin = createSelector(selectUserState, (state: UserState) => state.isAdmin);
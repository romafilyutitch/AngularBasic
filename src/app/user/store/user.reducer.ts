import { createReducer, on, Action } from '@ngrx/store';
import { requestCurrentUser, requestCurrentUserFail, requestCurrentUserSuccess } from './user.actions';

export interface UserState {
    isAdmin: boolean;
    name: string;
}
export const userFeatureKey: string = 'user';
export const initialState: UserState = {
    isAdmin: false,
    name: 'user'
};

export const reducer = createReducer(
    initialState,
    on(requestCurrentUser, state => state),
    on(requestCurrentUserFail, state => state),
    on(requestCurrentUserSuccess, (state, user) => ({
        ...state,
        isAdmin: user.role === 'admin',
        name: user.name
    }))
);

export const userReducer = (state: UserState, action: Action): UserState => reducer(state, action);
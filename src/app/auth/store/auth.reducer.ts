import { state } from '@angular/animations';
import {Action, createReducer, on} from '@ngrx/store';
import { requestLogin, requestLoginFail, requestLoginSuccess, requestLogout, requestLogoutSuccess, requestRegister, requestRegisterFail, requestRegisterSuccess } from './auth.actions';

export const authFeatureKey: string = 'auth'

export interface AuthState {
    isAuthorized: boolean;
    token: string;
    errorMessage: string;
};

export const initialState: AuthState = {
    isAuthorized: false,
    token: '',
    errorMessage: ''
};

export const reducer = createReducer(
    initialState, 
    on(requestLogin, state => state),
    on(requestLoginSuccess, (state, action) => ({
        ...state,
        token: action.token
    })),
    on(requestLoginFail, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage
    })),
    on(requestRegister, state => state),
    on(requestRegisterSuccess, state => state),
    on(requestRegisterFail, state => state),
    on(requestLogout, state => state),
    on(requestLogoutSuccess, state => state)
)

export const authReducer = (state: AuthState, action: Action) => reducer(state, action);
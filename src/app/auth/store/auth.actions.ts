import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/user/user.model';


export const requestLogin = createAction('[Login] Request', props<User>());
export const requestLoginSuccess = createAction('[Login] Request Success', props<{ token: string }>());
export const requestLoginFail = createAction('[Login] Requeest Fail', props<{ errorMessage: string }>());
export const requestRegister = createAction('[Register] Request', props<User>());
export const requestRegisterSuccess = createAction('[Register] Request Success');
export const requestRegisterFail = createAction('[Register] Request Fail', props<{ errorMessage: string }>());
export const requestLogout = createAction('[Logout] Request');
export const requestLogoutSuccess = createAction('[Logout] Request Success');
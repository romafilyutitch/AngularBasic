import {createAction, props} from '@ngrx/store';
import { User } from '../user.model';

export const requestCurrentUser = createAction('[Current User]  Request');
export const requestCurrentUserSuccess = createAction('[Current User] Request Success',props<User>());
export const requestCurrentUserFail = createAction('[Current User] Request Fail');
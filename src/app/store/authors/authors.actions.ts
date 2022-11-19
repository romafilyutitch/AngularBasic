import { createAction, props } from '@ngrx/store';
import { Author } from './../../services/author.model';

export const requestAuthors = createAction('[Authors] Request');
export const reqeustAuthorsSuccess = createAction('[Authors] Request Success', props<{ authors: Author[] }>());
export const requestAuthorsFail = createAction('[Authors] Request Fail');
export const requestAddAuthor = createAction('[Author] Request Add', props<Author>());
export const requestAddAuthorSuccess = createAction('[Author] Request Add Success', props<{ addedAuthor: Author }>());
export const requestAddAuthorFail = createAction('[Author] Request Add Fail');
export const resetAddedAuthor = createAction('[Author] Request Reset');
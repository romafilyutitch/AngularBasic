import { UserState } from './user.reducer';


export const getName = (state: UserState) => state.name;
export const isAdmin = (state: UserState) => state.isAdmin;
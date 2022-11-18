import { AuthState } from "./auth.reducer";

export const isUserAuthorized = (state: AuthState) => state.isAuthorized;
export const getToken = (state: AuthState) => state.token;
export const getSpecificErrorMessage = (state: AuthState) => state.errorMessage;
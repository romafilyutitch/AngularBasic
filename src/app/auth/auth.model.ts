export interface User {
    email: string;
    name: string;
    password: string
}

export interface AuthResponse {
    successfull: boolean;
    result: string;
    user?: User;
    errors?: string[];
}
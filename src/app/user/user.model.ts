export interface User {
    email: string;
    name?: string;
    password: string
    role?: string;
}

export interface UserResponse {
    successful: boolean;
    result: User;
}
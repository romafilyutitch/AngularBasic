import { User } from "../user/user.model";

export interface AuthResponse {
    successfull: boolean;
    result: string;
    user?: User;
    errors?: string[];
}
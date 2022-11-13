import { User } from "../user/user.model";

export interface AuthResponse {
    successful: boolean;
    result: string;
    user?: User;
    errors?: string[];
}
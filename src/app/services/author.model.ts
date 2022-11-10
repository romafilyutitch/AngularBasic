export interface Author {
    name: string;
    id?: string;
}

export interface AuthorResponseBody {
    success: boolean;
    result: Author[];
}
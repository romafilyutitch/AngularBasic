export interface Author {
    name: string;
    id?: string;
}

export interface AuthorsResponseBody {
    success: boolean;
    result: Author[];
}

export interface AuthorResponseBody {
    success: boolean;
    result: Author;
}
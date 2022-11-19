import { AuthorsState } from "./authors.reducer";

export const getAddedAuthor = (state: AuthorsState) => state.addedAuthor;
export const getAuthors = (state: AuthorsState) => state.authors;
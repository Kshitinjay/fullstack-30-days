export interface User {
    id: string;
    name: string;
    email: string;
}

export interface CreateUserInput {
    name: string;
    email: string;
}

export interface SearchUserInput {
    name?: string | undefined;
    email?: string | undefined;
}
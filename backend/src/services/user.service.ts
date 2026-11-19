import { randomUUID } from "node:crypto";

import type { User, CreateUserInput, SearchUserInput } from "../types/user.types.js";

const users: User[] = [];

const normalize = (value: unknown): string =>
    typeof value === "string" ? value.trim().toLowerCase() : "";

export const createUser = (userData: CreateUserInput): User | null => {
    const nameFilter = normalize(userData?.name);
    const emailFilter = normalize(userData?.email);

    if (!nameFilter && !emailFilter) {
        return null;
    }

    const existingUser = users.find((user) => user.email === userData.email);

    if (existingUser) {
        return null;
    }

    const newUser: User = {
        id: randomUUID(),
        name: userData.name,
        email: userData.email,
    };

    users.push(newUser);

    return newUser;
};

export const getAllUsers = (): User[] => {
    return [...users];
};

export const getUserById = (userId: string): User | undefined => {
    return users.find((user) => user.id === userId);
};

export const searchUsers = ({ name, email }: SearchUserInput): User | null => {
    const nameFilter = normalize(name);
    const emailFilter = normalize(email);

    if (!nameFilter && !emailFilter) {
        return null;
    }

    const user = users.find(
        (user) =>
            (!nameFilter || user.name.toLowerCase() === nameFilter) &&
            (!emailFilter || user.email.toLowerCase() === emailFilter),
    );

    return user ?? null;
};
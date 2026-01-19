import { apiClient } from '@/lib/api-client';
import type { User } from '@/types';

let usersPromise: Promise<User[]> | null = null;

export function getUsers() {
    if (usersPromise) return usersPromise;

    usersPromise = apiClient.get<User[]>('/users')
        .then(res => res.data)
        .catch(err => {
            usersPromise = null;
            throw err;
        });

    return usersPromise;
}
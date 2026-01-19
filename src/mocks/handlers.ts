import { http, HttpResponse, delay } from 'msw';
import { generateMockUsers } from '@/lib/mock-data';

const users = generateMockUsers(5000);

export const handlers = [
    http.get('/api/users', async () => {

        await delay(1000);

        return HttpResponse.json(users);
    }),
];
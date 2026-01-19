import type { User } from "@/types";

const INTERESTS_LIST = [
    'music', 'react', 'hiking', 'travel', 'coding',
    'art', 'cooking', 'gaming', 'photography', 'reading',
    'movies', 'fitness', 'yoga', 'dancing', 'politics',
    'history', 'science', 'technology', 'design', 'fashion',
    'writing', 'volunteering', 'gardening', 'fishing', 'cars',
    'crypto', 'startups', 'anime', 'board games', 'coffee',
    'wine', 'pets', 'football', 'javascript', 'psychology'
];

const FIRST_NAMES = [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
    'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Melissa', 'George', 'Deborah'
];

const LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateMockUsers = (count: number): User[] => {
    return Array.from({ length: count }).map((_, i) => {
        const lat = 44.4 + Math.random() * (52.4 - 44.4);
        const lng = 22.2 + Math.random() * (40.2 - 22.2);

        const shuffledInterests = [...INTERESTS_LIST].sort(() => 0.5 - Math.random());
        const userInterests = shuffledInterests.slice(0, Math.floor(Math.random() * 3) + 1);
        const firstName = getRandomElement(FIRST_NAMES);
        const lastName = getRandomElement(LAST_NAMES);

        return {
            id: i,
            name: `${firstName} ${lastName}`,
            lat,
            lng,
            interests: userInterests,
        };
    });
};
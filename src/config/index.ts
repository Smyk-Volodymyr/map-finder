export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    },
    mocks: {
        enabled: import.meta.env.VITE_ENABLE_MOCKS === 'true',
    },
    app: {
        title: import.meta.env.VITE_APP_TITLE || 'Map Finder',
    }
} as const;
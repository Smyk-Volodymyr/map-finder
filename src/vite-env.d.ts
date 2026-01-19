declare module 'react-leaflet-cluster';

declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_API_BASE_URL: string
    readonly VITE_ENABLE_MOCKS: string 
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
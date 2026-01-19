# Map Finder

An interactive React application for finding people based on their interests and location. Features a high-performance map with clustering, custom markers, and real-time filtering.

## Tech Stack

* **Core**: [React](https://react.dev/) (Vite), [TypeScript](https://www.typescriptlang.org/)
* **Map**: [React Leaflet](https://react-leaflet.js.org/), Leaflet
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (Radix UI)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State Management**: Custom Hooks + URL Search Params
* **Mocking**: [MSW](https://mswjs.io/) (Mock Service Worker)

## 🚀 How to Run

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone [https://github.com/Smyk-Volodymyr/map-finder.git](https://github.com/Smyk-Volodymyr/map-finder.git)
    cd map-finder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory. You can copy the example config:

    ```bash
    cp .env.example .env
    ```

    Ensure your `.env` contains the following settings:
    ```properties
    VITE_APP_TITLE=Map Finder
    VITE_API_BASE_URL=/api
    VITE_ENABLE_MOCKS=true
    ```
    > **Note:** Set `VITE_ENABLE_MOCKS=true` to use the fake backend (MSW) with generated data.

4.  **Start the development server**:
    ```bash
    npm run dev
    ```

The app will open at `http://localhost:5173` (or the port shown in your terminal).
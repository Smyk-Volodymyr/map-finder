import { Suspense, useState, useMemo, use } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Loader2, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import 'leaflet/dist/leaflet.css';

import { Sidebar } from "@/components/sidebar";
import { MarkersLayer } from "@/components/markers-layer";
import { MapController, LocateControl } from "@/components/map-controls";

import { getUsers } from '@/lib/users-resource';
import { useUrlSync } from '@/hooks/use-url-sync';
import {DEFAULT_CENTER, DEFAULT_ZOOM} from "@/const";


function AppContent() {
    const users = use(getUsers());

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
    const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
    const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [matchAll, setMatchAll] = useState(false);

    const dynamicInterests = useMemo(() => {
        const interests = new Set<string>();
        users.forEach(u => u.interests.forEach(i => interests.add(i)));
        return Array.from(interests).sort();
    }, [users]);

    useUrlSync(
        selectedInterests,
        setSelectedInterests,
        matchAll,
        setMatchAll
    );

    const filteredCount = useMemo(() => {
        if (selectedInterests.length === 0) return users.length;

        return users.filter(user => {
            if (matchAll) {
                return selectedInterests.every(tag => user.interests.includes(tag));
            }
            return user.interests.some(tag => selectedInterests.includes(tag));
        }).length;
    }, [users, selectedInterests, matchAll]);

    const closeSidebarOnMobile = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleResetFilter = () => {
        setSelectedInterests([]);
        setMatchAll(false);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground relative">

            <Button
                variant="outline" size="icon"
                className={`
                    absolute top-4 left-4 z-[3000] md:hidden bg-white shadow-md
                    ${isSidebarOpen ? 'hidden' : 'flex'} 
                `}
                onClick={() => setIsSidebarOpen(true)}
            >
                <Menu className="h-4 w-4" />
            </Button>

            <Sidebar
                isOpen={isSidebarOpen}
                totalUsers={users.length}
                filteredCount={filteredCount}
                options={dynamicInterests}
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                matchAll={matchAll}
                setMatchAll={setMatchAll}
                resetFilter={handleResetFilter}
                isFiltering={false}

                onCloseMobile={() => setIsSidebarOpen(false)}

                onLocationSelect={(lat, lng) => {
                    setMapCenter([lat, lng]);
                    setMapZoom(12);
                    closeSidebarOnMobile();
                }}
            />

            <main className="flex-1 relative h-full bg-slate-100">
                <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={DEFAULT_ZOOM}
                    className="h-full w-full z-0"
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocateControl />
                    <MapController center={mapCenter} zoom={mapZoom} />

                    <MarkersLayer
                        selectedInterests={selectedInterests}
                        matchAll={matchAll}
                    />
                </MapContainer>
            </main>
        </div>
    );
}

function App() {
    return (
        <Suspense fallback={<FullScreenLoader />}>
            <AppContent />
        </Suspense>
    );
}

const FullScreenLoader = () => (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
            </div>
            <p className="text-muted-foreground font-medium animate-pulse">
                Download map...
            </p>
        </div>
    </div>
);

export default App;
import { useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { Locate } from 'lucide-react';

export const LocateControl = () => {
    const map = useMap();
    const handleLocate = useCallback(() => {
        map.locate().on("locationfound", function (e) {
            map.flyTo(e.latlng, 13, { animate: true, duration: 1.5 });
        });
    }, [map]);

    return (
        <div className="absolute top-4 right-4 z-[400]">
            <Button
                variant="secondary" size="icon"
                className="shadow-lg bg-white hover:bg-gray-100"
                onClick={handleLocate} title="Знайти мене"
            >
                <Locate className="h-5 w-5 text-gray-700" />
            </Button>
        </div>
    );
};

export const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }, [center, zoom, map]);
    return null;
};
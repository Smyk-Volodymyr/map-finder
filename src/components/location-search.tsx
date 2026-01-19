import { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDebounce } from '@/hooks/use-debounce';

interface LocationResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

interface LocationSearchProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

export const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.length < 3) {
            setResults([]);
            return;
        }

        const fetchLocations = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}&limit=5`
                );
                const data = await res.json();
                setResults(data);
            } catch (error) {
                console.error("Geocoding error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [debouncedQuery]);

    const handleSelect = (result: LocationResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        onLocationSelect(lat, lng);
        setOpen(false);
        setQuery(result.display_name.split(',')[0]);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-background text-muted-foreground hover:text-foreground"
                >
                    <span className="truncate">
                        {query || "Пошук міста..."}
                    </span>
                    {loading ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin opacity-50" />
                    ) : (
                        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[300px] p-0 z-[3000]" align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Введіть назву (Київ, Lviv...)"
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        {loading && (
                            <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Шукаю...
                            </div>
                        )}

                        {!loading && results.length === 0 && debouncedQuery.length >= 3 && (
                            <CommandEmpty>Нічого не знайдено.</CommandEmpty>
                        )}

                        <CommandGroup>
                            {results.map((result) => (
                                <CommandItem
                                    key={result.place_id}
                                    value={result.display_name}
                                    onSelect={() => handleSelect(result)}
                                    className="cursor-pointer"
                                >
                                    <MapPin className="mr-2 h-4 w-4 opacity-50" />
                                    <span className="truncate">{result.display_name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
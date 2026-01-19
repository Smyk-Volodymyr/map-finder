import { Layers, Filter, Loader2, X } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/multi-select";
import { LocationSearch } from "@/components/location-search";

interface SidebarProps {
    isOpen: boolean;
    totalUsers: number;
    filteredCount: number;
    options: string[];
    selectedInterests: string[];
    setSelectedInterests: (val: string[]) => void;
    matchAll: boolean;
    setMatchAll: (val: boolean) => void;
    resetFilter: () => void;
    isFiltering: boolean;
    onLocationSelect: (lat: number, lng: number) => void;
    onCloseMobile: () => void;
}

export const Sidebar = ({
                            isOpen,
                            totalUsers,
                            filteredCount,
                            options,
                            selectedInterests,
                            setSelectedInterests,
                            matchAll,
                            setMatchAll,
                            resetFilter,
                            isFiltering,
                            onLocationSelect,
                            onCloseMobile
                        }: SidebarProps) => {
    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-[2500] 
                h-full bg-card shadow-xl border-r 
                transition-transform duration-300 ease-in-out flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                w-full md:relative md:w-80 md:translate-x-0 
            `}
        >
            <CardHeader className="pt-5 pb-4 shrink-0 flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Layers className="h-6 w-6" /> Map Finder
                    </CardTitle>
                    <CardDescription>Find people based on interests</CardDescription>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden -mt-1 -mr-2"
                    onClick={onCloseMobile}
                >
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>
            <Separator />

            <CardContent className="flex-1 py-6 space-y-6 overflow-y-auto">
                <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                        Location
                    </Label>
                    <LocationSearch onLocationSelect={onLocationSelect} />
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1">
                                <Filter className="h-3 w-3" /> Filter by topic
                            </Label>
                            {isFiltering && (
                                <span className="flex items-center gap-1 text-xs text-primary animate-pulse">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Search...
                                </span>
                            )}
                        </div>

                        <MultiSelect
                            options={options}
                            selected={selectedInterests}
                            onChange={setSelectedInterests}
                            placeholder="Select topics..."
                            isLoading={isFiltering}
                        />
                    </div>

                    {selectedInterests.length > 1 && (
                        <div className="flex items-center justify-between space-x-2 bg-muted/40 p-3 rounded-md border animate-in fade-in">
                            <Label htmlFor="strict-mode" className="flex flex-col cursor-pointer">
                                <span className="font-medium">Advanced search</span>
                                <span className="text-xs text-muted-foreground">All selected topics must match</span>
                            </Label>
                            <Switch
                                id="strict-mode"
                                checked={matchAll}
                                onCheckedChange={setMatchAll}
                            />
                        </div>
                    )}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2 border">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total in database:</span>
                        <span className="font-mono font-bold">{totalUsers}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-primary font-medium">Found:</span>
                        {isFiltering ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : (
                            <Badge variant="outline" className="font-mono text-base px-2">
                                {filteredCount}
                            </Badge>
                        )}
                    </div>
                </div>

                {selectedInterests.length > 0 && (
                    <Button variant="destructive" className="w-full" onClick={resetFilter}>
                        Discard all ✕
                    </Button>
                )}
            </CardContent>

            <div className="p-4 border-t text-xs text-center text-muted-foreground bg-muted/20 shrink-0">
                Map Finder v2.5 • Mobile Ready
            </div>
        </aside>
    );
};
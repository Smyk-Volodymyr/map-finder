import { useState, useMemo, useCallback, memo } from 'react';
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react';
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    isLoading?: boolean;
}

export const MultiSelect = memo(({ options, selected, onChange, placeholder, isLoading }: MultiSelectProps) => {
    const [open, setOpen] = useState(false);
    const selectedSet = useMemo(() => new Set(selected), [selected]);

    const handleSelect = useCallback((currentValue: string) => {
        const newSelected = selectedSet.has(currentValue)
            ? selected.filter((item) => item !== currentValue)
            : [...selected, currentValue];
        onChange(newSelected);
    }, [selected, selectedSet, onChange]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-auto min-h-[44px] py-2 px-3 bg-white hover:bg-gray-50 border-gray-300 relative"
                >
                    <div className="flex flex-wrap gap-1 items-center text-left w-full pr-6">
                        {selected.length === 0 && (
                            <span className="text-muted-foreground font-normal">{placeholder || "Вибрати..."}</span>
                        )}
                        {selected.length > 0 && selected.map((item) => (
                            <Badge key={item} variant="secondary" className="mr-1 mb-1 bg-slate-100 hover:bg-slate-200 border-slate-300">
                                {item}
                                <span
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer hover:text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(item);
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </span>
                            </Badge>
                        ))}
                    </div>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : (
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                        )}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 z-[3000]" align="start">
                <Command>
                    <CommandInput placeholder="Пошук..." />
                    <CommandList>
                        <CommandEmpty>Нічого не знайдено.</CommandEmpty>
                        <CommandGroup className="max-h-[250px] overflow-auto">
                            {options.map((option) => {
                                const isSelected = selectedSet.has(option);
                                return (
                                    <CommandItem
                                        key={option}
                                        value={option}
                                        onSelect={() => handleSelect(option)}
                                        className="cursor-pointer"
                                    >
                                        <div className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                                        )}>
                                            <Check className={cn("h-3 w-3")} />
                                        </div>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});
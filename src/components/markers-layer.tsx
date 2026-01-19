import { use, useMemo, memo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Badge } from "@/components/ui/badge";
import { createAvatarIcon, stringToColor, getInitials } from '@/lib/map-utils';
import { getUsers } from '@/lib/users-resource';

interface ClusterType {
    getChildCount: () => number;
}

const createClusterCustomIcon = function (cluster: ClusterType) {
    const count = cluster.getChildCount();

    let size = 'small';
    if (count > 10) size = 'medium';
    if (count > 100) size = 'large';

    return L.divIcon({
        html: `<div class="cluster-inner">
                 <span class="cluster-count">${count}</span>
               </div>`,
        className: `custom-cluster-marker cluster-${size}`,
        iconSize: L.point(40, 40, true),
    });
}

interface MarkersLayerProps {
    selectedInterests: string[];
    matchAll?: boolean;
}

export const MarkersLayer = memo(({ selectedInterests, matchAll = false }: MarkersLayerProps) => {
    const users = use(getUsers());

    const interestSet = useMemo(() => new Set(selectedInterests), [selectedInterests]);

    const filteredUsers = useMemo(() => {
        if (selectedInterests.length === 0) return users;

        return users.filter(user => {
            if (matchAll) {
                return selectedInterests.every(tag => user.interests.includes(tag));
            }
            return user.interests.some(tag => interestSet.has(tag));
        });
    }, [users, interestSet, selectedInterests, matchAll]);

    return (
        <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            polygonOptions={{
                fillColor: '#ffffff',
                color: '#000000',
                weight: 0,
                opacity: 0,
                fillOpacity: 0
            }}
        >
            {filteredUsers.map((user) => (
                <Marker
                    key={user.id}
                    position={[user.lat, user.lng]}
                    icon={createAvatarIcon(user.name)}
                >
                    <Popup>
                        <div className="min-w-[200px]">
                            <h3 className="font-bold text-lg mb-2 border-b pb-2 flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white shadow-sm"
                                    style={{ backgroundColor: stringToColor(user.name) }}
                                >
                                    {getInitials(user.name)}
                                </div>
                                {user.name}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {user.interests.map(tag => (
                                    <Badge
                                        key={tag}
                                        variant={interestSet.has(tag) ? "default" : "secondary"}
                                        className="text-[10px] px-2 py-0.5 cursor-default"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    );
});
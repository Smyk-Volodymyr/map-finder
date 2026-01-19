import L from 'leaflet';

export const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 65%, 45%)`;
};

export const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
};

export const createAvatarIcon = (name: string) => {
    const initials = getInitials(name);
    const bgColor = stringToColor(name);

    return L.divIcon({
        className: 'custom-avatar-marker',
        html: `<div class="avatar-inner" style="background-color: ${bgColor}; color: #fff;">${initials}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
};
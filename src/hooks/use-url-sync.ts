import { useEffect } from 'react';

export function useUrlSync(
    selectedInterests: string[],
    setSelectedInterests: (tags: string[]) => void,
    matchAll: boolean,
    setMatchAll: (val: boolean) => void
) {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tags = params.get('tags');
        const strict = params.get('strict');

        if (tags) setSelectedInterests(tags.split(',').filter(Boolean));
        if (strict === 'true') setMatchAll(true);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (selectedInterests.length > 0) {
            params.set('tags', selectedInterests.join(','));
        } else {
            params.delete('tags');
        }

        if (matchAll) {
            params.set('strict', 'true');
        } else {
            params.delete('strict');
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, '', newUrl);

    }, [selectedInterests, matchAll]);
}
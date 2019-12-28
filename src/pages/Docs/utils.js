import { useState, useCallback } from 'react';

const useDocLightbox = () => {
    const [lightboxState, setLightboxState] = useState({ toggler: false });

    const openModal = useCallback((source, event) => {
        event.preventDefault();
        setLightboxState(({ toggler } = {}) => {
            const isPdf = typeof source !== 'string';
            return {
                key: source,
                toggler: !toggler,
                openOnMount: true,
                ...(!isPdf ? { type: 'image' } : {}),
                [!isPdf ? 'sources' : 'customSources']: [source]
            };
        });
    }, []);

    return [lightboxState, openModal];
};

export { useDocLightbox };

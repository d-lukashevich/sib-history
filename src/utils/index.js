import { useState, useCallback } from 'react';

const useLightboxController = () => {
    const [lightboxState, setLightboxState] = useState({
        toggler: false,
        source: null
    });

    const openSlide = useCallback(
        (slide, event) => {
            if (event) event.preventDefault();
            setLightboxState((prevState) => ({
                toggler: !prevState.toggler,
                source: slide
            }));
        },
        [setLightboxState]
    );
    return [lightboxState, openSlide];
};

const createMarkup = (__html) => ({ __html });

export { createMarkup, useLightboxController };

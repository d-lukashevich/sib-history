import React from 'react';
import Lightbox from 'fslightbox-react';

import { useLightboxController } from '../../utils';

import { StyledFeature, InnerTemplate } from './units';

const Feature = ({ heading, tag, img, href, description, narrow = false, video = false, double = false, ...rest }) => {
    const [lightboxState, openVideo] = useLightboxController();
    return (
        <>
            {video && (
                <Lightbox
                    key={href}
                    type={'youtube'}
                    {...lightboxState}
                    sources={[href, typeof double === 'object' ? double.href : null]}
                />
            )}
            <StyledFeature {...{ img, narrow, double, ...rest }}>
                <InnerTemplate {...{ img, narrow, video, href, double, openVideo, heading, description, tag }} />
                {typeof double === 'object' && <InnerTemplate {...{ ...double, openVideo }} />}
            </StyledFeature>
        </>
    );
};
export default Feature;

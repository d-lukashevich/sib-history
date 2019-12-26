import React from 'react';
import Lightbox from 'fslightbox-react';

import { useLightboxController } from '../../utils';

import {
    StyledFeature,
    StyledInner,
    StyledDetails,
    StyledTagLine,
    StyledTag,
    StyledHeading,
    StyledDescription
} from './units';

const Feature = ({ heading, tag, img, href, description, narrow = false, video = false, double = false, ...rest }) => {
    const [lightboxState, openImgSlide] = useLightboxController();
    return (
        <>
            {video && <Lightbox key={href} type={'youtube'} {...lightboxState} sources={[href]} />}
            <StyledFeature {...{ img, narrow, double, ...rest }}>
                <StyledInner
                    {...{ img, narrow, video, href, double, as: href ? 'a' : 'div' }}
                    onClick={(e) => {
                        e.preventDefault();
                        openImgSlide(href);
                    }}>
                    {(heading || description) && (
                        <StyledDetails {...{ double }}>
                            {(tag || video) && (
                                <StyledTagLine>
                                    <StyledTag>{tag || 'видео'}</StyledTag>
                                </StyledTagLine>
                            )}
                            {heading && <StyledHeading>{heading}</StyledHeading>}
                            {description && <StyledDescription>{description}</StyledDescription>}
                        </StyledDetails>
                    )}
                </StyledInner>
            </StyledFeature>
        </>
    );
};
export default Feature;

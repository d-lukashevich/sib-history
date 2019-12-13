import React from 'react';
import {
    StyledFeature,
    StyledInner,
    StyledDetails,
    StyledTagLine,
    StyledTag,
    StyledHeading,
    StyledDescription
} from './units';

const Feature = ({ heading, tag, img, href, description, narrow = false, video = false, double = false }) => (
    <StyledFeature {...{ img, narrow, double }}>
        <StyledInner {...{ img, narrow, video, href, double, as: href ? 'a' : 'div' }}>
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
);

export default Feature;

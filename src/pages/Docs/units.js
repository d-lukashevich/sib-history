import React from 'react';
import styled from '@emotion/styled';

const PDFIframe = styled.iframe`
    display: block;
    width: 90vw;
    height: 90vh;
`;

const StyledVideo = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 45% 0 0;
    margin: 0 auto;
    position: relative;
`;

const VideoIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const StyledImg = styled.img`
    display: inline-block;
    width: 100%;
    max-width: 400px;
`;

const Wrapper = styled.div`
    margin: 10px 0;
    text-align: center;
`;

const Video = ({ video: src }) =>
    src && (
        <StyledVideo>
            <VideoIframe {...{ src }} frameBorder={0} allow={'autoplay; encrypted-media'} allowFullScreen={true} />
        </StyledVideo>
    );

const Image = ({ openModal, fileLink, preview: { img, sizedImg } = {} }) => {
    if (!img && !sizedImg) return null;
    const iframe = !fileLink ? null : (
        <div>
            <PDFIframe src={fileLink} frameBorder="0" />
        </div>
    );
    const href = iframe || img || sizedImg;
    return (
        <a href={href} onClick={(e) => openModal(href, e)}>
            <StyledImg src={sizedImg || img} alt={''} />
        </a>
    );
};

const Item = ({ title, preview, video, openModal, fileLink }) => (
    <div>
        <h3>{title}</h3>
        <Wrapper>
            <Video video={!video ? null : 'https://www.youtube.com/embed/' + video} />
            <Image {...{ preview, fileLink, openModal }} />
        </Wrapper>
    </div>
);

export { Item };

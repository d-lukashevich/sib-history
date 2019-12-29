const getVideoProps = ({ id, videoLink, ...restProps } = {}) => ({
    tag: 'Видео',
    video: true,
    fixedBg: false,
    href: 'https://youtu.be/' + videoLink,
    ...restProps
});

export { getVideoProps };

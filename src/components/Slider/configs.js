import { css } from '@emotion/core';

export default {
    images: {
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 4000,
            lazyLoad: 'ondemand',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        },
        css: css`
            a {
                display: block;
                padding: 0 7px;
                box-shadow: none;
                &:hover {
                    box-shadow: none;
                }
                img {
                    margin: 0 auto;
                    max-height: 185px;
                }
            }
        `
    },
    partners: {
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 4000,
            lazyLoad: 'progressive',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        },
        css: css`
            display: flex;
            justify-content: center;
            align-items: flex-end;
            list-style: none;
        `
    },
    video: {
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000
        },
        css: css`
            list-style: none;
            li {
                display: block;
            }
            iframe {
                display: block;
                width: 560px;
                max-width: 100%;
                height: 315px;
                margin: 0 auto;
            }
        `
    }
};

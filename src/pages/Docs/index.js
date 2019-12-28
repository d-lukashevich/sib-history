import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import Lightbox from 'fslightbox-react';
import { Main, Feature, Loader, ShowMore } from '../../components';
import headerImg from './assets/img/docs__banner.jpg';
import { Item } from './units';
import { useDocLightbox } from './utils';

import docsLogic from '../../store/docs';

const Docs = () => {
    const { visibleSortedDocs, visibleCount, sortedDocs, isLoading } = useValues(docsLogic);
    const { getDocsData, increaseVisibleCount } = useActions(docsLogic);

    const [lightboxState, openModal] = useDocLightbox();

    useEffect(() => {
        getDocsData();
    }, [getDocsData]);

    return (
        <>
            <Loader active={isLoading} full={!visibleSortedDocs.length} />
            {lightboxState.key && <Lightbox openOnMount={true} sourceIndex={0} {...lightboxState} />}
            <Feature {...{ img: headerImg, heading: 'Проекты', narrow: true }} />
            <Main>
                {visibleSortedDocs.map((doc) => (
                    <Item {...{ ...doc, openModal, key: doc.id }} />
                ))}
                <ShowMore {...{ increaseVisibleCount, visibleCount, list: sortedDocs }} />
            </Main>
        </>
    );
};

export default Docs;

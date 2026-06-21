import { Fancybox } from '@fancyapps/ui';

const contentSelector = '.single-page--v1__content';
const triggerSelector = `${contentSelector} [data-dp-fancybox]`;

const getMediaSource = (media, existingLink) => {
    if (existingLink?.href) {
        return existingLink.href;
    }

    if (media instanceof HTMLVideoElement) {
        return media.currentSrc || media.src || media.querySelector('source')?.src || '';
    }

    return media.dataset.fullUrl || media.currentSrc || media.src || '';
};

const prepareFancyboxMedia = () => {
    const container = document.querySelector(contentSelector);

    if (!container) {
        return;
    }

    container.querySelectorAll('.fancybox').forEach((fancyboxElement) => {
        const mediaElements = fancyboxElement.matches('img, video')
            ? [fancyboxElement]
            : fancyboxElement.querySelectorAll('img, video');

        mediaElements.forEach((media) => {
            let link = media.closest('a');
            const source = getMediaSource(media, link);

            if (!source) {
                return;
            }

            if (!link || !fancyboxElement.contains(link)) {
                link = document.createElement('a');
                media.replaceWith(link);
                link.appendChild(media);
            }

            link.href = source;
            link.dataset.dpFancybox = '';
            link.dataset.fancybox = 'gallery';
            link.dataset.type = media instanceof HTMLVideoElement ? 'html5video' : 'image';
        });
    });
};

const fancyboxConfig = {
    autoFocus: false,
    placeFocusBack: false,
    hideScrollbar: false,
    Hash: false,
    idle: false,
    compact: false,
    dragToClose: true,
    groupAll: false,
    Thumbs: false,
    Toolbar: false,

    Carousel: {
        transition: 'fadeFast',
        preload: 3,
        Navigation: false,
    },

    Images: {
        zoom: false,
        Panzoom: {
            panMode: 'mousemove',
            mouseMoveFactor: 1.1,
        },
        initialSize: 'fit',
        minScale: 0.1,
        maxScale: 1,
    },
};

prepareFancyboxMedia();
Fancybox.bind(triggerSelector, fancyboxConfig);

document.addEventListener('DOMContentLoaded', prepareFancyboxMedia);
window.addEventListener('load', prepareFancyboxMedia);

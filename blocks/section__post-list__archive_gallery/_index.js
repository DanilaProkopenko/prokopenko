const initArchiveGalleryScroll = () => {
    document.querySelectorAll('.posts-list__archive-gallery').forEach((gallery) => {
        let pointerId = null;
        let startX = 0;
        let startScrollLeft = 0;
        let didDrag = false;
        let velocity = 0;
        let lastScrollLeft = 0;
        let lastMoveTime = 0;
        let inertiaFrame = null;

        const stopInertia = () => {
            if (inertiaFrame !== null) {
                cancelAnimationFrame(inertiaFrame);
                inertiaFrame = null;
            }
        };

        const startInertia = () => {
            if (Math.abs(velocity) < 0.02) {
                return;
            }

            let previousTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = Math.min(currentTime - previousTime, 32);
                const previousScrollLeft = gallery.scrollLeft;

                gallery.scrollLeft += velocity * elapsed;
                velocity *= Math.pow(0.95, elapsed / 16.67);
                previousTime = currentTime;

                const reachedEdge = gallery.scrollLeft === previousScrollLeft;

                if (Math.abs(velocity) < 0.02 || reachedEdge) {
                    inertiaFrame = null;
                    return;
                }

                inertiaFrame = requestAnimationFrame(animate);
            };

            inertiaFrame = requestAnimationFrame(animate);
        };

        const stopDragging = (event) => {
            if (pointerId !== null && gallery.hasPointerCapture(pointerId)) {
                gallery.releasePointerCapture(pointerId);
            }

            pointerId = null;
            gallery.classList.remove('is-dragging');

            if (didDrag && event.type === 'pointerup') {
                const idleTime = performance.now() - lastMoveTime;
                velocity *= Math.max(0, 1 - idleTime / 100);
                startInertia();
            }
        };

        gallery.addEventListener('pointerdown', (event) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) {
                return;
            }

            stopInertia();
            pointerId = event.pointerId;
            startX = event.clientX;
            startScrollLeft = gallery.scrollLeft;
            didDrag = false;
            velocity = 0;
            lastScrollLeft = gallery.scrollLeft;
            lastMoveTime = performance.now();
        });

        gallery.addEventListener('pointermove', (event) => {
            if (event.pointerId !== pointerId) {
                return;
            }

            const distance = event.clientX - startX;

            if (!didDrag && Math.abs(distance) < 5) {
                return;
            }

            if (!didDrag) {
                didDrag = true;
                gallery.classList.add('is-dragging');
                gallery.setPointerCapture(pointerId);
            }

            gallery.scrollLeft = startScrollLeft - distance;

            const currentTime = performance.now();
            const elapsed = currentTime - lastMoveTime;

            if (elapsed > 0) {
                const currentVelocity = (gallery.scrollLeft - lastScrollLeft) / elapsed;
                velocity = velocity * 0.7 + currentVelocity * 0.3;
                velocity = Math.max(-1.5, Math.min(1.5, velocity));
                lastScrollLeft = gallery.scrollLeft;
                lastMoveTime = currentTime;
            }
        });

        gallery.addEventListener('pointerup', stopDragging);
        gallery.addEventListener('pointercancel', stopDragging);
        gallery.addEventListener('dragstart', (event) => event.preventDefault());

        gallery.addEventListener('click', (event) => {
            if (!didDrag) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            didDrag = false;
        }, true);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArchiveGalleryScroll);
} else {
    initArchiveGalleryScroll();
}

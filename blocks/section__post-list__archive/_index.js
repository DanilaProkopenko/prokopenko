
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.css";

const initBlockTemplate = () => {
    const archiveList = Array.from(document.getElementsByClassName('posts-list__archive'));
    if (archiveList) {
        archiveList.forEach((item) => {
            const options = {
                infinite: false,
                transition: false,
                Dots: false,
                Navigation: false,
                center: true,
            }
            new Carousel(item, options);
        })
    }
};
initBlockTemplate();

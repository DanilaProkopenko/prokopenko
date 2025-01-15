import { Fancybox } from '@fancyapps/ui';

(function fancyapps() {
    Fancybox.bind(
        'a[href*=".jpg"],a[href*=".jpeg"],a[href*=".png"],a[href*=".gif"]',
        {
            groupAll: false,
            // Your custom options
        }
    );
    // console.log('fancyapps')
})();
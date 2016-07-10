'use strict';

import ajax from './utils/ajax';

let actions = {
    trackSearchTemplate: null
};

let api = {
    init: (rootUrl) => {
        ajax.get(rootUrl,
        (result) => {
            result.links.forEach((link, index) => {
                if(link.rel === 'catalog-track-search') {
                    actions.trackSearchTemplate = link.href;
                }
            });
            console.log(`API: Initialised.
             trackSearchTemplate: ${actions.trackSearchTemplate}`);
        });
    },

    search: (data, callback) => {
        if(data.type === 'track') {
            var url = actions.trackSearchTemplate
                .replace('{portal}', data.portal)
                .replace('{query}', data.query);
            ajax.get(url, (result) => {
                console.log(`API: Search initiated by ${url}.
                    Query: ${data.query}. Type: ${data.type}. Portal: ${data.portal}`);
                if (typeof callback == 'function') {
                    callback(result);
                } else {
                    throw new Error('Callback is not a function.');
                }
            });
        } else {
            throw new Error(`Type is not supported: ${data.type}`);
        }

    }
};

export default api;
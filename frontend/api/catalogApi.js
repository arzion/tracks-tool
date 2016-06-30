'use strict'

import ajax from '../utils/ajax';

let actions = {
    searchTracks: null
}

let api = {
    init: (rootUrl) => {
        ajax.get(rootUrl, (result) => {
            actions.searchTracks = 'http://search.catalogApi'
            console.log(`CATALOG API: Initialised. GET from ${rootUrl}. Result: ${result}`);
        })
    },

    searchTracks: (query, callback) => {
        ajax.get(actions.searchTracks, (result) => {
            console.log(`CATALOG API: Search initiated by: ${actions.searchTracks}. Query: ${query}. Result: ${result}`);
            if (typeof callback == 'function') {
                callback(result);
            }
        });
    }
}

export default api;
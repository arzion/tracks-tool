'use strict'

import ajax from '../utils/ajax';

let actions = {
    getSimilar: null
}

let api = {
    init: (rootUrl) => {
        ajax.get(rootUrl, (result) => {
            actions.getSimilar = 'http://get-similar.bmatApi'
            console.log(`BMAT API: Initialised. GET from ${rootUrl}. Result: ${result}`);
        })
    },

    searchTrack: (query, callback) => {
        ajax.get(actions.searchTrack, (result) => {
            console.log(`BMAT API: Similar initiated by: ${actions.searchTrack}. Query: ${query}. Result: ${result}`);
            if (typeof callback == 'function') {
                callback(result);
            }
        });
    }
}

export default api;
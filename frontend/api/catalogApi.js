'use strict';

import ajax from '../utils/ajax';

let actions = {
    searchTracks: null
}

let api = {
    init: (rootUrl) => {
        ajax.get(rootUrl,
        (result) => {
            actions.searchTracks = 'http://search.catalogApi';
            console.log(`CATALOG API: Initialised. GET from ${rootUrl}. Result: ${result}`);
        });
    },

    searchTracks: (query, callback) => {
        ajax.get(actions.searchTracks, (result) => {
            console.log(`CATALOG API: Search initiated by: ${actions.searchTracks}. Query: ${query}. Result: ${result}`);
            if (typeof callback == 'function') {
                callback([{
                    isrc: 100,
                    lmid: 200,
                    trackName: 'Hello',
                    artistName: 'Adele',
                    albumName: 'The best',
                    duration: 250,
                    sample: 'https://cs7-2v4.vk-cdn.net/p24/d31c2fc11feb9d.mp3'
                }, {
                    isrc: 101,
                    lmid: 201,
                    trackName: 'Hit me baby one more time',
                    artistName: 'Britney Spears',
                    albumName: 'Toxic',
                    duration: 212
                }, {
                    isrc: 102,
                    lmid: 202,
                    trackName: 'Crip',
                    artistName: 'Radiohead',
                    albumName: 'Crip',
                    duration: 341
                }, {
                    isrc: 103,
                    lmid: 203,
                    trackName: 'Love is live',
                    artistName: 'Madonna',
                    albumName: 'TThis summer',
                    duration: 283
                }]);
            }
        });
    }
}

export default api;
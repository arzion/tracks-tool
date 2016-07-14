'use strict';

import ajax from './utils/ajax';

let actions = {
    trackSearchTemplate: null,
    getTrackTemplate: null,
    getTracksToTrackRecommendations: null
};

let api = {
    init: (rootUrl) => {
        ajax.get(rootUrl,
        (result) => {
            result.links.forEach((link, index) => {
                if(link.rel === 'catalog-track-search') {
                    actions.trackSearchTemplate = link.href;
                }
                if(link.rel === 'catalog-track') {
                    actions.getTrackTemplate = link.href;
                }
                if(link.rel === 'recommendations-tracks-to-track') {
                    actions.getTracksToTrackRecommendations = link.href;
                }
            });
            console.log(`API: Initialised.`);
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
    },

    getTrack: (trackId, portalId, callback) => {
        var url = actions.getTrackTemplate
            .replace('{portal}', portalId)
            .replace('{trackId}', trackId);
        ajax.get(url, (result) => {
            console.log(`API: Get track initiated by ${url}.
                    TrackId: ${trackId}. Portal: ${portalId}`);
            if (typeof callback == 'function') {
                callback(result);
            } else {
                throw new Error('Callback is not a function.');
            }
        });
    },

    getTracksToTrackRecommendations: (trackId, portalId, callback) => {
        var url = actions.getTracksToTrackRecommendations
            .replace('{portal}', portalId)
            .replace('{trackId}', trackId);
        ajax.get(url, (result) => {
            console.log(`API: Get tracks recommendation by track initiated by ${url}.
                    TrackId: ${trackId}. Portal: ${portalId}`);
            if (typeof callback == 'function') {
                callback(result);
            } else {
                throw new Error('Callback is not a function.');
            }
        });
    }
};

export default api;
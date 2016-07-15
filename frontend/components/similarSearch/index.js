'use strict';

import api from 'bmatTestToolApi';
import seedTemplate from './seed.hbs';
import recommendationsTemplate from './recommendations.hbs';

function SimilarSearch(container, trackData) {
    let _this = this;
    _this.container = container;
    _this.data = trackData;

    init();

    function init() {
        api.getTrack(_this.data.trackId, _this.data.portalId, result => {
            var html = seedTemplate(result);
            _this.container.innerHTML = html;

            _this.findSimilar(_this.data.isrc, _this.data.portalId);
        });
    }

    _this.findSimilar = function(isrc, portalId) {
        api.getTracksToTrackRecommendations(isrc, portalId, function(result) {
            var recommendationsHtml = recommendationsTemplate({
                recommendations: result
            });
            _this.container.querySelector('.recommendations-container').innerHTML = recommendationsHtml;
        });
    };
}

export default SimilarSearch;
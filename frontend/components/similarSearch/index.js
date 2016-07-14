'use strict';

import api from 'bmatTestToolApi';
import seedTemplate from './seed.hbs';
import recommendationsTemplate from './recommendations.hbs';

function SimilarSearch(container, trackId, portalId) {
    let _this = this;
    _this.container = container;
    _this.trackId = trackId;
    _this.portalId = portalId;

    init();

    function init() {
        api.getTrack(_this.trackId, _this.portalId, result => {
            var html = seedTemplate(result);
            _this.container.innerHTML = html;

            _this.find(_this.trackId, _this.portalId);
        });
    }

    _this.find = function(trackId, portalId) {
        api.getTracksToTrackRecommendations(trackId, portalId, function(result) {
            var recommendationsHtml = recommendationsTemplate({
                recommendations: result
            });
            _this.container.querySelector('.recommendations-container').innerHTML = recommendationsHtml;
        });
    };
}

export default SimilarSearch;
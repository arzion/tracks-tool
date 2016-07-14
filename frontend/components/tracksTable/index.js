'use strict';

import './tracksTable.less';

function TracksTable(container) {
    let _this = this;
    _this.container = container;
    _this.portalId = null;

    _this.render = function (data) {
        require.ensure([], function(){
            _this.portalId = data.portalId;

            var table = require('./tracksTable.hbs');
            var html = table({
                query: data.query,
                rows: data.rows
            });

            _this.container.innerHTML = html;
            _this.container.querySelectorAll('.similar-button').forEach(el => {
                el.addEventListener('click', () => {
                    _this.findSimilar(el.dataset.id, _this.portalId);
                });
            });
        });
    };

    _this.findSimilar = function(trackId, portalId) {
        require.ensure(['similarSearch'], function () {
            let SimilarSearch = require('similarSearch');
            new SimilarSearch(_this.container, trackId, portalId);
        });
    }
}

export default TracksTable;
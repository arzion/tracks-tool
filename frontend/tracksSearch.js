'use strict';

import helpers from './utils/helpers';
import api from './api/catalogApi';

function TracksSearch(input, button, results) {
    var _this = this;
    _this.searchInput = input;
    _this.searchButton = button;
    _this.resultContainer = results;

    _this.init = function () {
        let searchTracksThrottle = helpers.throttleCall(api.searchTracks, 2000, false);
        let doSearch = function () {

            searchTracksThrottle(_this.searchInput.value, (result) => {
                require.ensure(['./components/tracksTable'], function () {
                    let TracksTable = require('./components/tracksTable');
                    new TracksTable(_this.resultContainer).render(result);
                });
            });
        };
        _this.searchInput.addEventListener('keydown', (e) => {
            if (e.keyCode !== 13) {
                return;
            }
            doSearch();
        });
        _this.searchButton.addEventListener('click', () => {
            doSearch();
        });
    }
}

export default TracksSearch;
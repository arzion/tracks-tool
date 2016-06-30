'use strict'

import helpers from './utils/helpers';
import api from './api/catalogApi';

function TracksSearch(input, button, results) {
    var _this = this;
    _this.searchInput = input;
    _this.searchButton = button;
    _this.resultContainer = results;

    _this.init = function() {
        let searchTracksThrottle = helpers.throttleCall(api.searchTracks, 2000, false);
        let doSearch = function() {
            searchTracksThrottle(_this.searchInput.value, (result) => {
                _this.resultContainer.innerHTML +=
                    `<div>Time in ms: ${Date.now()}. Result is "${result}". Text: ${_this.searchInput.value}.</div>`;
            });
        }
        _this.searchInput.addEventListener('keydown', (e) => {
            if (e.keyCode != 13) {
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
'use strict';

import helpers from 'utils/helpers';
import api from 'api/catalogApi';
import searchTemplate from './tracksSearch.hbs';

let TracksTable = require('tracksTable');

function TracksSearch(container) {
    var _this = this;
    _this.container = container;

    _this.init = function () {
        _this.container.innerHTML = searchTemplate();

        let searchInput = _this.container.querySelector('#search-track-input');
        let searchButton = _this.container.querySelector('#search-track-button');

        let searchTracksThrottle = helpers.throttleCall(api.searchTracks, 2000, false);
        let doSearch = function () {

            searchTracksThrottle(searchInput.value, (result) => {
                require.ensure(['tracksTable'], function () {
                    let TracksTable = require('tracksTable');
                    new TracksTable(document.getElementById('search-result-container')).render({
                        query: searchInput.value,
                        rows: result
                    });
                });
            });
        };
        searchInput.addEventListener('keydown', (e) => {
            if (e.keyCode !== 13) {
                return;
            }
            doSearch();
        });
        searchButton.addEventListener('click', () => {
            doSearch();
        });
    }
}

export default TracksSearch;
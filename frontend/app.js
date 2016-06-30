'use strict'

import settings from './app.settings';
import bmatApi from './api/bmatApi';
import catalogApi from './api/catalogApi';
import TracksSearch from './tracksSearch';

// Init APIs with root URL
bmatApi.init(settings.rootBmatApi);
catalogApi.init(settings.rootCatalogApi);

// Init track search plugin
var searchInput = document.getElementById('search-track-input');
var searchButton = document.getElementById('search-track-button');
var resultContainer = document.getElementById('search-result-container');
new TracksSearch(searchInput, searchButton, resultContainer).init();
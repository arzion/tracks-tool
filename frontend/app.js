'use strict';

import './app.less';

import settings from './app.settings';
import bmatApi from './api/bmatApi';
import catalogApi from './api/catalogApi';
import TracksSearch from './components/tracksSearch';

// Init APIs with root URL
bmatApi.init(settings.rootBmatApi);
catalogApi.init(settings.rootCatalogApi);

// Init track search component
new TracksSearch(document.getElementById('search-track-container')).init();
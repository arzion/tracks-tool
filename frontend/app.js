'use strict';

import './app.less';

import settings from './app.settings';
import api from './bmatTestToolApi';
import TracksSearch from './components/tracksSearch';

// Init APIs with root URL
api.init(settings.rootApi);

// Init track search component
new TracksSearch(document.getElementById('search-track-container')).init();
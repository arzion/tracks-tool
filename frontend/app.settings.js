'use strict';

let settings = {
    rootApi: 'http://localhost/bmat/api/'
};

if (NODE_ENV === 'production') {
    settings.rootApi = 'http://localhost/bmat/api/';
}

export default settings;
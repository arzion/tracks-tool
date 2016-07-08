'use strict';

let settings = {
    rootBmatApi: 'http://bmat-api-dev/',
    rootCatalogApi: 'http://catalog-api-dev/'
};

if (NODE_ENV === 'production') {
    settings.rootBmatApi = 'http//bmat-api-prod';
    settings.rootCatalogApi = 'http://catalog-api-prod/';
}

export default settings;
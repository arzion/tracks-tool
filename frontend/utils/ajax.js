'use strict';

let ajax = {
    get: (url, callback) => {
        if (typeof callback == 'function') {
            callback('Ajax_Response_GET');
        }
    },

    post: (url, data, callback) => {
        if (typeof callback == 'function') {
            callback('Ajax_Response_POST');
        }
    }
}

export default ajax;
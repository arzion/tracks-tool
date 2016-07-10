'use strict';

let ajax = {
    get: (url, callback, error) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) {
                return;
            }
            if (this.status != 200) {
                if (typeof error == 'function') {
                    error(this);
                }
            }
            if (typeof callback == 'function') {
                callback(JSON.parse(this.responseText));
            }
        }
    },

    post: (url, data, callback) => {
        if (typeof callback == 'function') {
            callback('Ajax_Response_POST');
        }
    }
}

export default ajax;
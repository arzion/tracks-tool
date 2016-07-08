'use strict';

import './tracksTable.less';

function TracksTable(container) {
    let _this = this;
    _this.container = container;

    _this.render = function (data) {
        require.ensure([], function(){
            var table = require('./tracksTable.hbs');
            var html = table({
                query: data.query,
                rows: data.rows
            });
            _this.container.innerHTML = html;
        });
    }
}

export default TracksTable;
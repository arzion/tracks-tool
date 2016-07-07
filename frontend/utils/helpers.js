'use strict';

var helpers = {
    throttleCall: function(func, ms, lastExecute) {
        lastExecute = typeof lastExecute == 'boolean' ? lastExecute : true;
        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {
            if (isThrottled) {
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments);

            isThrottled = true;

            setTimeout(function() {
                isThrottled = false;
                if (savedArgs) {
                    if (lastExecute) {
                        wrapper.apply(savedThis, savedArgs);
                    }
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    },

    debounceCall: function(f, ms) {
        var state = null;
        var cooldown = 1;

        return function() {
            if (state) {
                return;
            }

            f.apply(this, arguments);

            state = cooldown;
            setTimeout(function() {
                state = null;
            }, ms);
        }
    }
}

export default helpers;
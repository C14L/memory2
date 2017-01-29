
var pubsub = (function () {

    var _events = {};  // collect event names and attached listeners here.

    return {

        pub: function (eventName, info) {
            if (!_events.hasOwnProperty(eventName)) {
                return;
            }
            if (info == undefined) {
                info = {};
            }
            _events[eventName].forEach(function (listener) {
                listener(info);
            });
        },

        sub: function (eventName, listener) {
            if (!_events.hasOwnProperty(eventName)) {
                _events[eventName] = [];
            }
            console.log('pubsub: for event '+eventName+' add '+listener);
            _events[eventName].push(listener);
        },

        unsub: function (eventName, listenerToRemove) {
            if (!_events.hasOwnProperty(eventName)) {
                return;
            }

            var toDelete = [];

            for (var i=0; i<_events[eventName].length; i++) {
                if (_events[eventName] == listenerToRemove) {
                    toDelete.push(i);
                }
            }
            for (var i=0; i<toDelete.length; i++) {
                delete _events[eventName][toDelete[i]];
            }
        },

    };
})();

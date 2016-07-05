L.Permalink = {
    //gets the map center, zoom-level and rotation from the URL if present, else uses default values
    getMapLocation: function (zoom, center) {
        'use strict';
        zoom = (zoom || zoom === 0) ? zoom : 18;
        center = (center) ? center : [52.26869, -113.81034];

        if (window.location.hash !== '') {
            var hash = window.location.hash.replace('#', '');
            var parts = hash.split(',');
            if (parts.length === 3) {
                center = {
                    lat: parseFloat(parts[0]),
                    lng: parseFloat(parts[1])
                };
                zoom = parseInt(parts[2].slice(0, -1), 10);
            }
        }
        return {zoom: zoom, center: center};
    },

    setup: function (map) {
        'use strict';
        var shouldUpdate = true;
        var updatePermalink = function () {
            if (!shouldUpdate) {
                // do not update the URL when the view was changed in the 'popstate' handler (browser history navigation)
                shouldUpdate = true;
                return;
            }

            var center = map.getCenter();
            var hash = '#' +
                    Math.round(center.lat * 100000) / 100000 + ',' +
                    Math.round(center.lng * 100000) / 100000 + ',' +
                    map.getZoom() + 'z';
            var state = {
                zoom: map.getZoom(),
                center: center
            };
            window.history.pushState(state, 'map', hash);
        };

        map.on('moveend', updatePermalink);

        // restore the view state when navigating through the history, see
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
        window.addEventListener('popstate', function (event) {
            if (event.state === null) {
                return;
            }
            map.setView(event.state.center, event.state.zoom);
            shouldUpdate = false;
        });
    }
};

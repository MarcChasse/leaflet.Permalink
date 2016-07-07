L.Map.mergeOptions({
	permalink: false
});

L.Map.Permalink = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		var mappos = this._getMapLocation(this._map.options.zoom, this._map.options.center);
		this._map.options.zoom = mappos.zoom;
		this._map.options.center = mappos.center;
	},

	addHooks: function () {
		var shouldUpdate = true;
		window.addEventListener('popstate', this._restoreViewState());
		this._map.on('moveend', this._updatePermalink(shouldUpdate));
	},

	removeHooks: function () {
		this._map.off('moveend', this._updatePermalink);
		window.removeEventListener('popstate', this._restoreViewState());
	},

	_getMapLocation: function (zoom, center) {
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

	_restoreViewState: function (event) {
        if (!event || event.state === null) {
        	console.log('_restoreViewState returned');
            return;
        }
        map.setView(event.state.center, event.state.zoom);
        shouldUpdate = false;
    },

	_updatePermalink: function (shouldUpdate) {
        if (!shouldUpdate) {
            // do not update the URL when the view was changed in the 'popstate' handler (browser history navigation)
            shouldUpdate = true;
            return;
        }

        var center = this._map.getCenter();
        var hash = '#' +
                Math.round(center.lat * 100000) / 100000 + ',' +
                Math.round(center.lng * 100000) / 100000 + ',' +
                this._map.getZoom() + 'z';
        var state = {
            zoom: this._map.getZoom(),
            center: center
        };
        window.history.pushState(state, 'map', hash);
    }
});

L.Map.addInitHook('addHandler', 'permalink', L.Map.Permalink);
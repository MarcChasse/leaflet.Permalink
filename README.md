# Leaflet.Permalink
Adds the maps center and Zoom as a Permalink for Leaflet maps, checkout the [DEMO](https://marcchasse.github.io/Leaflet.Permalink/)

Leaflet.Permalink is based on [Openlayer 3's Permalink example](http://openlayers.org/en/latest/examples/Permalink.html)
and is known to work with the latest version of [Leaflet 1.0.0-rc1](http://leafletjs.com/reference-1.0.0.html).
History.pushState is used for navigation which means this plugin will only work with IE10 or higher: [caniuse](http://caniuse.com/#feat=history).

## Quick Start

1. Create a leaflet map. Checkout Leaflets [Quick Start Guide](http://leafletjs.com/examples/quick-start.html) for a basic map example.

```html
<script src="https://cdn.rawgit.com/MarcChasse/Leaflet.Permalink/master/Leaflet.Permalink.min.js"></script>
```
3. Add the following code to the map initialization:
```javascript
```
## Complete Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Leaflet.Permalink DEMO</title>
	<link rel="stylesheet" href="https://npmcdn.com/leaflet@1.0.0-rc.1/dist/leaflet.css" />
	<style>html,body{margin:0;}#map{width:100vw;height:100vh;}</style>
</head>
<body>
	<div id="map"></div>
	<script src="https://npmcdn.com/leaflet@1.0.0-rc.1/dist/leaflet.js"></script>
	<script>
	    osm = new L.TileLayer(
	    	'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	    	{attribution: 'Map data &copy; OpenStreetMap contributors'}
	    );

		var mappos = L.Permalink.getMapLocation();
	    var map = L.map('map', {
	        center: mappos.center,
	        zoom: mappos.zoom
	    });
		map.addLayer(osm);
	    L.Permalink.setupMapPermalink(map);
	</script>
</body>
</html>
```
Checkout the [DEMO](https://marcchasse.github.io/Leaflet.Permalink/)

## Options
### `L.Permalink.getMapLocation`

| Option | Type                                                 | Default                | Description                                                 |
|--------|------------------------------------------------------|------------------------|-------------------------------------------------------------|
| zoom   | Number                                               | 18                     | The zoom level of the map when no Permalink hash is present |
| center | [LatLng](http://leafletjs.com/reference.html#latlng) | [52.26869, -113.81034] | The center of the map when no Permalink hash is present     |
|        |                                                      |                        |                                                             |

### `L.Permalink.setup`

None.
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile';
import { applyStyle } from 'ol-mapbox-style';
import { createXYZ } from 'ol/tilegrid';
import OGCVectorTile from 'ol/source/OGCVectorTile';
import MVT from 'ol/format/MVT';

const countries = new VectorTileLayer({
  declutter: true,
  source: new OGCVectorTile({
    url: 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad',
    format: new MVT(),
  }),
});
applyStyle(countries, 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/styles/default.json?f=mapbox', {
  updateSource: false,
  transformRequest(url, type) {
    if (type === 'Sprite') {
      return new Request('data:application/json;utf8,{}');
    }
  }
});

const map = new Map({
  target: 'map',
  layers: [countries],
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
});

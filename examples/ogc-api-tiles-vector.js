import MVT from 'ol/format/MVT.js';
import Map from 'ol/Map.js';
import OGCVectorTile from 'ol/source/OGCVectorTile.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import View from 'ol/View.js';

const map = new Map({
  target: 'map',
  layers: [
    new VectorTileLayer({
      source: new OGCVectorTile({
        url: 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad',
        format: new MVT(),
      }),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
});

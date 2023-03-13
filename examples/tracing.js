import 'ol/ol.css' assert { type: 'css' }; 

import Draw from 'ol/interaction/Draw.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import Snap from 'ol/interaction/Snap.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

// features in this layer will be snapped to
const baseVector = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: '../data/geojson/fire.json',
  }),
  style: {
    'fill-color': 'rgba(255, 0, 0, 0.3)',
    'stroke-color': 'rgba(255, 0, 0, 0.9)',
    'stroke-width': 2
  },
});

// this is where the drawn features go
const drawVector = new VectorLayer({
  source: new VectorSource(),
  style: {
    'stroke-color': 'rgba(100, 255, 0, 1)',
    'stroke-width': 3,
    'fill-color': 'rgba(100, 255, 0, 0.3)',
  },
});

const map = new Map({
  layers: [baseVector, drawVector],
  target: 'map',
  view: new View({
    center: [-13378949, 5943751],
    zoom: 11,
  }),
});

const snapInteraction = new Snap({
  source: baseVector.getSource(),
});

const drawInteraction = new Draw({
  type: 'Polygon',
  source: drawVector.getSource(),
  trace: true,
  traceSource: baseVector.getSource(),
  style: {
    'stroke-color': 'rgba(255, 255, 100, 0.5)',
    'stroke-width': 1.5,
    'fill-color': 'rgba(255, 255, 100, 0.25)',
    'circle-radius': 6,
    'circle-fill-color': 'rgba(255, 255, 100, 0.5)',
  },
});
map.addInteraction(drawInteraction);
map.addInteraction(snapInteraction);

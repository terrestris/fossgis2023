import 'ol/ol.css' assert { type: 'css' }; 

/* global pmtiles */
import DataTile from 'ol/source/DataTile.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import {useGeographic} from 'ol/proj.js';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

import VectorTile from 'ol/source/VectorTile';
import VectorTileLayer from 'ol/layer/VectorTile';
import MVT from 'ol/format/MVT';

useGeographic();

const tiles = new pmtiles.PMTiles(
  'https://pub-9288c68512ed46eca46ddcade307709b.r2.dev/protomaps-sample-datasets/terrarium_z9.pmtiles'
);

class OLPMTilesSource {
    constructor(url) {
        this._url = url;
        this._p = new pmtiles.PMTiles(url)
    }

    url = () => {
      return "pmtiles://" + this._url + "/{z}/{x}/{y}";
    }

    vectorTileLoadFunction = (tile,url) => {
      // the URL construction is done internally by OL, so we need to parse it 
      // back out here using a hacky regex
      const re = new RegExp(/pmtiles:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/);
      const result = url.match(re);
      const z = +result[2];
      const x = +result[3];
      const y = +result[4];

      tile.setLoader((extent, resolution, projection) => {
        tile.setState(1); // LOADING
        this._p.getZxy(z,x,y).then((tile_result) => {
          if (tile_result) {
            const format = tile.getFormat();
            const features = format.readFeatures(tile_result.data.buffer, {
              extent: extent,
              featureProjection: projection
            });
            tile.setFeatures(features);
            tile.setState(2); // LOADED
          } else {
            tile.setState(4); // EMPTY
          }
        });
      }); 
    }
  }

  const source = new OLPMTilesSource("https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles");

  const style = new Style({
    stroke: new Stroke({
      color: 'rgb(93, 63, 211)',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(180, 63, 211, 0.5)',
    }),
  });

  const vtLayer = new VectorTileLayer({
    declutter: true,
    source: new VectorTile({
      attributions:["© Land Information New Zealand"],
      maxZoom: 14, // this could come from the PMTiles header (async)
      format: new MVT(), // this could come from the PMTiles header (async)
      url: source.url(),
      tileLoadFunction: source.vectorTileLoadFunction
    }),
    style: style
  });



function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () => reject(new Error('load failed')));
    img.src = src;
  });
}

async function loader(z, x, y) {
  const response = await tiles.getZxy(z, x, y);
  const blob = new Blob([response.data]);
  const src = URL.createObjectURL(blob);
  const image = await loadImage(src);
  URL.revokeObjectURL(src);
  return image;
}

// The method used to extract elevations from the DEM.
function elevation(xOffset, yOffset) {
  const red = ['band', 1, xOffset, yOffset];
  const green = ['band', 2, xOffset, yOffset];
  const blue = ['band', 3, xOffset, yOffset];
  return ['-', ['+', ['*', 256 * 256, red], ['*', 256, green], blue], 32768];
}

// Generates a shaded relief image given elevation data.  Uses a 3x3
// neighborhood for determining slope and aspect.
const dp = ['*', 2, ['resolution']];
const z0x = ['*', ['var', 'vert'], elevation(-1, 0)];
const z1x = ['*', ['var', 'vert'], elevation(1, 0)];
const dzdx = ['/', ['-', z1x, z0x], dp];
const z0y = ['*', ['var', 'vert'], elevation(0, -1)];
const z1y = ['*', ['var', 'vert'], elevation(0, 1)];
const dzdy = ['/', ['-', z1y, z0y], dp];
const slope = ['atan', ['^', ['+', ['^', dzdx, 2], ['^', dzdy, 2]], 0.5]];
const aspect = ['clamp', ['atan', ['-', 0, dzdx], dzdy], -Math.PI, Math.PI];
const sunEl = ['*', Math.PI / 180, ['var', 'sunEl']];
const sunAz = ['*', Math.PI / 180, ['var', 'sunAz']];

const incidence = [
  '+',
  ['*', ['sin', sunEl], ['cos', slope]],
  ['*', ['*', ['cos', sunEl], ['sin', slope]], ['cos', ['-', sunAz, aspect]]],
];

const variables = {};

const layer = new TileLayer({
  source: new DataTile({
    loader,
    wrapX: true,
    maxZoom: 9,
    attributions:
      "<a href='https://github.com/tilezen/joerd/blob/master/docs/attribution.md#attribution'>Tilezen Jörð</a>",
  }),
  style: {
    variables: variables,
    color: ['array', incidence, incidence, incidence, 1],
  },
});

const controlIds = ['vert', 'sunEl', 'sunAz'];
controlIds.forEach(function (id) {
  const control = document.getElementById(id);
  const output = document.getElementById(id + 'Out');
  function updateValues() {
    output.innerText = control.value;
    variables[id] = Number(control.value);
  }
  updateValues();
  control.addEventListener('input', function () {
    updateValues();
    layer.updateStyleVariables(variables);
  });
});

const map = new Map({
  target: 'map',
  layers: [layer, vtLayer],
  view: new View({
    center: [174.76146587109235, -41.28906462711424],
    zoom: 4,
  })
});

function getElevation(data) {
  const red = data[0];
  const green = data[1];
  const blue = data[2];
  return red * 256 + green + blue / 256 - 32768;
}

function formatLocation([lon, lat]) {
  const NS = lat < 0 ? 'S' : 'N';
  const EW = lon < 0 ? 'W' : 'E';
  return `${Math.abs(lat).toFixed(1)}° ${NS}, ${Math.abs(lon).toFixed(
    1
  )}° ${EW}`;
}

const elevationOut = document.getElementById('elevationOut');
const locationOut = document.getElementById('locationOut');
function displayPixelValue(event) {
  const data = layer.getData(event.pixel);
  if (!data) {
    return;
  }
  elevationOut.innerText = getElevation(data).toLocaleString() + ' m';
  locationOut.innerText = formatLocation(event.coordinate);
}
map.on(['pointermove', 'click'], displayPixelValue);

import { Feature, Map, Overlay, View } from "ol";
import { Polygon } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, transformExtent, useGeographic } from "ol/proj";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import TileImage from "ol/source/TileImage";
import TileGrid from "ol/tilegrid/TileGrid";
import { fromUrl } from "geotiff";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import LayerSwitcher from 'ol-layerswitcher';
import { getCenter, getHeight, getWidth } from "ol/extent";
import Fill from "ol/style/Fill";

proj4.defs("EPSG:3035","+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
register(proj4);

useGeographic();

const gradientClasses = [{
  "label": "0 - <10%",
  "min": 0,
  "max": 0.1,
  "color": [255, 255, 154, 255]
}, {
  "label": "10 - <18%",
  "min": 0.1,
  "max": 0.18,
  "color": [12, 156, 205, 255]
}, {
  "label": "18 - <25%",
  "min": 0.18,
  "max": 0.25,
  "color": [255, 190, 255, 255]
}, {
  "label": "25 - <35%",
  "min": 0.25,
  "max": 0.35,
  "color": [0, 51, 255, 255]
}, {
  "label": "35 - <50%",
  "min": 0.35,
  "max": 0.5,
  "color": [255, 0, 0, 255]
}, {
  "label": ">=50%",
  "min": 0.5,
  "max": Number.MAX_SAFE_INTEGER,
  "color": [164, 164, 164, 255]
}];

const features = [
  new Feature(new Polygon([ [ [ 13.8102623, 47.1313258 ], [ 13.8102385, 47.1312659 ], [ 13.8104831, 47.1312495 ], [ 13.8107965, 47.1311969 ], [ 13.8109425, 47.1311732 ], [ 13.8110081, 47.1311803 ], [ 13.8110571, 47.1312499 ], [ 13.8111037, 47.1312511 ], [ 13.8114068, 47.1311853 ], [ 13.8114486, 47.1311998 ], [ 13.8114487, 47.1312122 ], [ 13.8114991, 47.1312318 ], [ 13.8115615, 47.1313585 ], [ 13.8115978, 47.1314791 ], [ 13.8112445, 47.1315672 ], [ 13.8112552, 47.1316112 ], [ 13.8113769, 47.1318176 ], [ 13.8115738, 47.1321455 ], [ 13.8115578, 47.1321574 ], [ 13.8111775, 47.1322839 ], [ 13.8109488, 47.1323659 ], [ 13.8108954, 47.1323689 ], [ 13.8108592, 47.1323688 ], [ 13.8108434, 47.1323648 ], [ 13.8108198, 47.1323372 ], [ 13.8106977, 47.1321836 ], [ 13.8105935, 47.1320394 ], [ 13.8104973, 47.1318761 ], [ 13.8104216, 47.1317234 ], [ 13.8103441, 47.1315315 ], [ 13.8103305, 47.1314989 ], [ 13.8103027, 47.1314276 ], [ 13.8102623, 47.1313258 ] ] ] )),
  new Feature(new Polygon([ [ [ 13.8094499, 47.1329309 ], [ 13.8094173, 47.1329802 ], [ 13.8093138, 47.1332034 ], [ 13.8092476, 47.1333647 ], [ 13.8091963, 47.1335723 ], [ 13.8091842, 47.1337144 ], [ 13.8091863, 47.1338569 ], [ 13.8087462, 47.1338575 ], [ 13.8086189, 47.1338509 ], [ 13.8086163, 47.1333527 ], [ 13.8086082, 47.1327256 ], [ 13.8086062, 47.1323025 ], [ 13.8086044, 47.1321606 ], [ 13.8091948, 47.1321862 ], [ 13.8091967, 47.1321229 ], [ 13.8093017, 47.1321314 ], [ 13.8098942, 47.1322045 ], [ 13.809735, 47.1325053 ], [ 13.8094499, 47.1329309 ] ] ] )),
  new Feature(new Polygon([ [ [ 13.8083723, 47.1297594 ], [ 13.8083325, 47.1296662 ], [ 13.8082615, 47.1294999 ], [ 13.8084951, 47.1294621 ], [ 13.8088799, 47.1294115 ], [ 13.8091108, 47.1294835 ], [ 13.8092746, 47.1295346 ], [ 13.8093044, 47.1295439 ], [ 13.8097044, 47.1296686 ], [ 13.8096595, 47.1297384 ], [ 13.8095317, 47.1297087 ], [ 13.8094689, 47.1298003 ], [ 13.8093934, 47.1297929 ], [ 13.8091552, 47.1297488 ], [ 13.8090985, 47.1297381 ], [ 13.8091042, 47.1297247 ], [ 13.8088761, 47.1296813 ], [ 13.8088659, 47.1297346 ], [ 13.8088545, 47.1297946 ], [ 13.8088633, 47.1298166 ], [ 13.8088801, 47.12985 ], [ 13.8083723, 47.1297594 ] ] ])),
  new Feature(new Polygon([ [ [ 13.8111987, 47.1329183 ], [ 13.8111112, 47.1327223 ], [ 13.8111186, 47.1327184 ], [ 13.8117655, 47.1324913 ], [ 13.8118876, 47.1324391 ], [ 13.8121591, 47.1323355 ], [ 13.8122052, 47.1323174 ], [ 13.8123923, 47.1325116 ], [ 13.8124484, 47.1326766 ], [ 13.8123926, 47.1326953 ], [ 13.8120469, 47.1328321 ], [ 13.8118185, 47.1329137 ], [ 13.8114133, 47.1330451 ], [ 13.8112489, 47.1330701 ], [ 13.8111987, 47.1329183 ] ] ]))
];
features.forEach((f, i) => f.setId(i));

const field = new VectorLayer({
  properties: {
    title: "Schlag"
  },
  source: new VectorSource({
    features
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'brown',
      width: 5
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0)'
    })
  })
});

const geotiff = fromUrl('http://assets.w3geo.at/bev-dtm/ALS_DTM_CRS3035RES50000mN2650000E4600000.tif')

const tileGrid = new TileGrid({
  resolutions: [
    255.10714285714286,
    127.87979539641944,
    63.93989769820972,
    31.990403071017276,
    15.995201535508638,
    7.998880179171333,
    3.999760019198464,
    1.999960001599936,
    1
  ],
  tileSizes: [128, 128, 128, 128, 128, 128, 128, 128, 256],
  origin: [4599999.484278579, 2700000.6538888784],
  extent: [4599999.484278579, 2649999.6538888784, 4650000.484278579, 2700000.6538888784]
});

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

async function getGradientData(extent, imageWidth, imageHeight, resolution) {
  extent = [Math.floor(extent[0]), Math.floor(extent[1]), Math.ceil(extent[2]), Math.ceil(extent[3])];
  imageWidth = Math.ceil(imageWidth);
  imageHeight = Math.ceil(imageHeight);
  const dtmData = (await (await geotiff).readRasters({
    bbox: extent,
    width: imageWidth,
    height: imageHeight,
  }))[0];
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  const geotiffImageData = context.createImageData(imageWidth, imageHeight);
  const { data, width, height } = geotiffImageData;
  const gradientData = new Uint8ClampedArray(width * height);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const x = Math.max(1, Math.min(width - 2, i));
      const y = Math.max(1, Math.min(height - 2, j));
      const dp = 2 * resolution;
      const z0x = dtmData[y * width + (x - 1)];
      const z1x = dtmData[y * width + (x + 1)];
      const dzdx = (z1x - z0x) / dp;
      const z0y = dtmData[(y - 1) * width + x];
      const z1y = dtmData[(y + 1) * width + x];
      const dzdy = (z1y - z0y) / dp;
      const slope = Math.sqrt(dzdx * dzdx + dzdy * dzdy);
      const gradientClassIndex = gradientClasses.findIndex(c => slope >= c.min && slope < c.max);
      gradientData[j * width + i] = gradientClassIndex;
      const color = gradientClasses[gradientClassIndex].color;
      const index = (j * width + i) * 4;
      data.set(color, index);
    }
  }
  return {geotiffImageData, gradientData};
}

const dtm = new TileLayer({
  properties: {
    title: "Hangneigungsklassen"
  },
  opacity: 0.7,
  visible: false,
  source: new TileImage({
    projection: 'EPSG:3035',
    interpolate: false,
    tileGrid,
    url: '{z}/{x}/{y}.png',
    tileLoadFunction: async (tile, src) => {
      const tileCoord = tile.getTileCoord();
      const extent = tileGrid.getTileCoordExtent(tileCoord);
      const resolution = tileGrid.getResolution(tileCoord[0])
      const tileSize = tileGrid.getTileSize(tileCoord[0]);
      const {geotiffImageData} = await getGradientData(extent, tileSize, tileSize, resolution);
      context.putImageData(geotiffImageData, 0, 0);
      tile.getImage().src = canvas.toDataURL('image/png');
    }
  })
});
const osm = new TileLayer({
  properties: {
    title: "Orthofoto"
  },
  source: new XYZ({
    url: 'https://maps{1-4}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg'
  })
});
const map = new Map({
  target: 'map',
  layers: [osm, dtm, field]
});

map.getView().fit(field.getSource().getExtent(), {padding: [25, 25, 25, 25]});

const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);

const schlagStyle = new Style({
  fill: new Fill({
    color: 'black'
  })
});

async function calculateGradientClasses(schlagFeature) {
  let extent3035 = transformExtent(schlagFeature.getGeometry().getExtent(), 'EPSG:4326', 'EPSG:3035');
  extent3035 = [Math.floor(extent3035[0]), Math.floor(extent3035[1]), Math.ceil(extent3035[2]), Math.ceil(extent3035[3])];
  const width = getWidth(extent3035);
  const height = getHeight(extent3035);
  const target = document.createElement('div');
  const schlagMap = new Map({
    target,
    pixelRatio: 1,
    layers: [new VectorLayer({
      source: new VectorSource({
        features: [schlagFeature]
      }),
      style: schlagStyle
    })],
    view: new View({
      projection: 'EPSG:3035',
      resolution: 1,
      center: getCenter(schlagFeature.getGeometry().getExtent())
    })
  });
  schlagMap.setSize([width, height])
  schlagMap.renderSync();

  const schlagCanvas = target.querySelector('canvas');
  const schlagContext = schlagCanvas.getContext('2d');

  const {gradientData} = (await getGradientData(extent3035, width, height, 1));
  const schlagData = schlagContext.getImageData(0, 0, width, height).data;
  const imgUri = schlagCanvas.toDataURL('image/png');

  const buckets = {};
  for (let i = 0, ii = schlagData.length; i < ii; i += 4) {
    const schlagAlpha = schlagData[i + 3];
    if (schlagAlpha > 0) {
      const key = gradientData[i / 4];
      buckets[key] = (buckets[key] || 0) + (schlagAlpha / 255);
    }
  }
  const total = Object.values(buckets).reduce((a, b) => a + b, 0);
  return {buckets, total, imgUri};
}

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
map.addOverlay(overlay);

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', async function (evt) {
  const feature = map.getFeaturesAtPixel(evt.pixel)?.[0];
  const coordinate = fromLonLat(evt.coordinate, 'EPSG:3035').map(Math.floor);
  const elevation = (await (await geotiff).readRasters({
    bbox: [coordinate[0], coordinate[1], coordinate[0] + 1, coordinate[1] + 1],
    width: 1,
    height: 1,
  }))[0];
  const data = dtm.getData(evt.pixel);
  if (!data || data[3] === 0) {
    return;
  }
  overlay.setPosition(evt.coordinate);
  const classIndex = gradientClasses.findIndex(c => data[0] === c.color[0] && data[1] === c.color[1] && data[2] === c.color[2]);
  const gradient = gradientClasses[classIndex].label;
  if (!feature) {
    content.innerHTML =
      '<p>Höhe: <b><code>' + elevation[0].toFixed(0) + ' m</code></b></p>' +
      '<p>Hangneigungsklasse: <b><code>' + gradient + '</code></b></p>';
    return;
  }

  const {buckets, total, imgUri} = await calculateGradientClasses(feature);
  content.innerHTML =
    '<img src="' + imgUri + '" style="width: 120px; float: right">' +
    '<p>Schlag ID: <b><code>' + feature.getId() + '</code></b>' +
    '<p>Fläche: <b><code>' + feature.getGeometry().clone().transform('EPSG:4326', 'EPSG:3035').getArea().toFixed(0) + ' m<sup>2</sup></code></b>' +
    '<p>Höhe: <b><code>' + elevation[0].toFixed(0) + ' m</code></b></p>' +
    '<p>Hangneigungsklasse: <b><code>' + gradient + '</code></b></p>' +
    '<p>Anteil an Schlagfläche: <b><code>' + Math.round(buckets[classIndex] / total * 100) + ' %</code></b></p>';
});
import { apply } from 'ol-mapbox-style';
import { useGeographic } from 'ol/proj';
import { Link as LinkInteraction } from 'ol/interaction';

useGeographic();

apply('map', 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_top.json').then((map) => {
  map.addInteraction(new LinkInteraction());
  console.log(map)
});

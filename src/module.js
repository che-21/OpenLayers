import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

export { Map, View, TileLayer, OSM, fromLonLat, toLonLat, VectorSource, VectorLayer, Icon, Style, Feature, Point };
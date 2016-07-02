'use strict';

/****************
*** Variables ***
****************/

// viewport
//var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//var windowArea = windowWidth * windowHeight;
// map and controls
var map;
var homeCoords = [40.914722, -77.774722];
var initZoom = 8;
var zoomHome;
// layer control
var basemapGroup;
//var overlayGroup;
var layerControl;


/*********************
*** Map & Controls ***
**********************/

// Map
map = L.map('map', {
   center: homeCoords,
   zoom: initZoom,
   zoomControl: false   
});

// Zoom Home Control
/*
zoomHomeControl = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: initZoom
}).addTo(map);
*/

/*** Layer Control ***/
basemapGroup = {};

//overlayGroup = {};

/* Original
layerControl = L.control.layers(basemapGroup, overlayGroup, {
    collapsed: setLayerControlCollapsedValue(windowWidth) 
}).addTo(map);
*/
layerControl = L.control.layers(basemapGroup, null).addTo(map);
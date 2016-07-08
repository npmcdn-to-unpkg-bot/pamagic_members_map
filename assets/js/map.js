'use strict';

/****************
*** Variables ***
****************/

// viewport
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var windowArea = windowWidth * windowHeight;
// Map & Controls
var map;
var homeCoords = [40.914722, -77.774722];
var initZoom = 8;
var zoomHome;
// layer control
var basemapGroup;
//var overlayGroup;
var layerControl;
// Layers
var esriGray;
var esriStreets;
var pmgMembers;



/*********************
*** Map & Controls ***
**********************/

// Map
map = L.map('map', {
   center: homeCoords,
   zoom: initZoom      
});

/*
map = L.map('map', {
   center: homeCoords,
   zoom: initZoom,
   zoomControl: false   
});
*/

// Zoom Home Control
/*
zoomHomeControl = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: initZoom
}).addTo(map);
*/

// Layers
esriGray = L.esri.basemapLayer('Gray').addTo(map);
esriStreets = L.esri.basemapLayer('Streets');

pmgMembers = L.esri.featureLayer({
    url: 'http://services2.arcgis.com/1mAVlDOwOjpt8pyU/arcgis/rest/services/PAMAGIC_Members/FeatureServer/0',
    onEachFeature: function (feature, layer) {
        var popupContent = L.Util.template('<div class="feat-popup"><h2>{FirstName} {LastName}</h2><hr /><h4>Contact Information</h4><ul><li>Phone Number: {TelephoneN}</li><li>E-mail: {EmailAddre}</li><li>Address: {AddressLin}, {City_1}, {State } {ZipCode}</li></ul></div>', feature.properties);
		layer.bindPopup(popupContent, {closeOnClick: true, maxHeight: setPopupMaxHeight(windowArea), maxWidth: setPopupMaxWidth(windowWidth)});
    }
}).addTo(map);

/*** Layer Control ***/
basemapGroup = {
    'Gray Canvas': esriGray,
    'Streets': esriStreets
};

//overlayGroup = {};

/* Original
layerControl = L.control.layers(basemapGroup, overlayGroup, {
    collapsed: setLayerControlCollapsedValue(windowWidth) 
}).addTo(map);
*/
layerControl = L.control.layers(basemapGroup, null).addTo(map);

// Geocode module
addressLocator();
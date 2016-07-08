/*********************************************************************
* Name: ESRI Leaflet Address Search
* Version: 1.1
* Created by: Patrick McKinney, Cumberland County GIS & ESRI
* Code sample from ESRI Leaflet Calcite project - https://github.com/Esri/calcite-maps/tree/master/samples/esri-leaflet
* Notes: for use with ESRI Leaflet Geocoder version 1.0.2
* requires variable windowArea which is window height * window width
* requires jQuery
**********************************************************************/

/*
Notes:
1. add in code from Bootleaf module for mobile device fixes
*/

function addressLocator() {
    'use strict';
    
    /*** Variables ***/
    var addressSearchControl;
    var addressSearchResults;
    
    /*** Address Search Tool ***/
    addressSearchControl = new L.esri.Geocoding.Controls.Geosearch({
        zoomToResult: true,
        collapseAfterResult: false,
        expanded: true,
        allowMultipleResults: true,
        maxResults: 5,
        useArcgisWorldGeocoder: true,	
        placeholder: 'Search for an address',
        title: 'Address Search',
        useMapBounds: false
    }).addTo(map);

    /*** Layer to hold search results ***/
    addressSearchResults = new L.LayerGroup().addTo(map);

    /*** Address search results event ***/
    addressSearchControl.on('results', function(data) {  
       if (data.results.length > 0) {
           // open pop-up for location
           var popup = L.popup()
           .setLatLng(data.results[0].latlng)
           .setContent(data.results[0].text)
           .openOn(map);
           map.setView(data.results[0].latlng);
       }
    });
}
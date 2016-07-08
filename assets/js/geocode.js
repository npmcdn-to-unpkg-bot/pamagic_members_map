/*********************************************************************
* Name: ESRI Leaflet Address Search & Feature Layer Search
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
    
    addressSearchControl = new L.esri.Geocoding.Controls.Geosearch({
        providers: [
            new L.esri.Geocoding.Controls.Geosearch.Providers.FeatureLayer({
            url: 'http://services2.arcgis.com/1mAVlDOwOjpt8pyU/arcgis/rest/services/PAMAGIC_Members/FeatureServer/0',
            label: 'PAMAGIC Members',    
            searchFields: ['FirstName', 'LastName'],
                formatSuggestion: function(feature){
                return feature.properties.FirstName + ' ' + feature.properties.LastName;
            }
          })
        ],
        zoomToResult: true,
        collapseAfterResult: false,
        expanded: true,
        useMapBounds: false,    
        allowMultipleResults: true,
        maxResults: 5,
        useArcgisWorldGeocoder: true,
        placeholder: 'Search for Address or Members',
        title: 'Address & Members Search'    
   }).addTo(map);

    /*** Layer to hold search results ***/
    addressSearchResults = new L.LayerGroup().addTo(map);

    /*** Address search results event ***/
    addressSearchControl.on('results', function(data) {  
       if (data.results.length > 0) {
           // open pop-up for location
           map.setView(data.results[0].latlng);
           var popup = L.popup()
           .setLatLng(data.results[0].latlng)
           .setContent(data.results[0].text)
           .openOn(map);
           //map.setView(data.results[0].latlng);
       }
    });
}
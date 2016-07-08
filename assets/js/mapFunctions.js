'use strict';
// Set the initial map zoom level based upon viewport width
function setInitialMapZoom(windowWidth) {
    var mapZoom;    
    if (windowWidth < 500) {
        mapZoom = 9; 
    } else if (windowWidth >= 500 && windowWidth < 1000) {
        mapZoom = 10; 
    } else {
        mapZoom = 11;  
    }
    return mapZoom;
}

// Change map zoom level based upon viewport width
function viewportChangeMapZoom(windowWidth) {
    if (windowWidth < 500) {
        map.setZoom(9);
    }  else if (windowWidth >= 500 && windowWidth < 1000) {
        map.setZoom(10);
    }  else {
       map.setZoom(11);
    }
}

// Set max height of pop-up window 
function setPopupMaxHeight(windowArea) {
    var maxHeight;
    if (windowArea < 315000 ) {
        maxHeight = 150;
    } else {
        maxHeight = 500;
    }
    return maxHeight;
}

// Set max width of pop-up window 
function setPopupMaxWidth(windowWidth) {
    var maxWidth;
    if (windowWidth < 450 ) {
        maxWidth = 240;
    } else {
        maxWidth = 300;
    }
    return maxWidth;
}

/**********************
*** Event Listeners ***
***********************/

// Resize Event
window.addEventListener('resize', function() {
    viewportChangeMapZoom();
}, false);

$(document).ready(function(){
    // Basemap changed
	$("#selectStandardBasemap").on("change", function(e) {
        setBasemap($(this).val());
    });
    // Search
    var input = $(".geocoder-control-input");
    input.focus(function(){
        $("#panelSearch .panel-body").css("height", "150px");
    });
    input.blur(function(){
        $("#panelSearch .panel-body").css("height", "auto");
    });
    // Attach search control for desktop or mobile
    function attachSearch() {
        var parentName = $(".geocoder-control").parent().attr("id"),
            geocoder = $(".geocoder-control"),
            width = $(window).width();
        if (width <= 767 && parentName !== "geocodeMobile") {
            geocoder.detach();
            $("#geocodeMobile").append(geocoder);
        } else if (width > 767 && parentName !== "geocode"){
            geocoder.detach();
            $("#geocode").append(geocoder);
        }
    }
    $(window).resize(function() {
        attachSearch();
    });
    attachSearch();
});<!-- jQuery -->
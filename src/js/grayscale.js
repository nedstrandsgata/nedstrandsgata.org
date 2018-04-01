(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

// Google Maps Scripts
var map = null;

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', function() {
  map.setCenter(new google.maps.LatLng(58.961129, 5.753784));
});

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 18,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(58.961129, 5.753784), // Nedstrandsgata 90, Stavanger

    // Disables the default Google Maps UI components
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false,

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 1
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }]
    }, {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    }]
  };


  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using out element and options defined above
  map = new google.maps.Map(mapElement, mapOptions);

  // run additional functions to add elements on to map
  addSameietPoly(map);
  addMarkers(map); // TODO later replace it with JSON file import, more here: https://developers.google.com/maps/documentation/javascript/importing_data
}

/* add polygon to show sameiet' area */
function addSameietPoly(map) {
  // define sameiet' areal
  // coords obtained from: https://kommunekart.com/klient/stavanger/planer (id 54/517)
  var coords = [{
    lat: 58.9609654,
    lng: 5.7532827
  }, {
    lat: 58.9611362,
    lng: 5.7535122
  }, {
    lat: 58.961169,
    lng: 5.7534283
  }, {
    lat: 58.96136,
    lng: 5.75371
  }, {
    lat: 58.96129,
    lng: 5.75393
  }, {
    lat: 58.96109,
    lng: 5.75431
  }, {
    lat: 58.96098,
    lng: 5.75421
  }, {
    lat: 58.96108,
    lng: 5.75385
  }, {
    lat: 58.96082,
    lng: 5.75349
  }];

  // construct the polygon.
  var polygon = new google.maps.Polygon({
    paths: coords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.1,
    strokeWeight: 1,
    fillColor: '#ffffff',
    fillOpacity: 0.1
  });
  polygon.setMap(map);
} 

/* adds marker on the map at given location */
function addMarker(location, map) {
  // custom Map Marker Icon
  // customize the map-marker.png file to customize your icon
  var image = 'img/map-marker.svg';

  var marker = new google.maps.Marker({
    //label: { text: 'C3' },  // TODO add later seksjons numer to each house
    position: location,
    icon: image,
    map: map
  });
}

/* add house markers to given map */
function addMarkers(map) {
  addMarker({
    lat: 58.96124,
    lng: 5.75374
  }, map);

  addMarker({
    lat: 58.96116,
    lng: 5.75397
  }, map);

  addMarker({
    lat: 58.96110,
    lng: 5.75410
  }, map);

  addMarker({
    lat: 58.96108,
    lng: 5.75362
  }, map);

  addMarker({
    lat: 58.96096,
    lng: 5.75350
}, map);}

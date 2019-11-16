var map;
var service;
var infowindow;

function initMap() {
    
        var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
      
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
          });
      
        var request = {
          location: pyrmont,
          radius: '500',
          type: ['restaurant', 'Bars']
        };
  

  
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


//   service.findPlaceFromQuery(request, function(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         //createMarker(results[i]);
//         console.log(results[i]);
//       }

//       map.setCenter(results[0].geometry.location);
//     }
//   });
 }

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place);
        createMarker(results[i]);
      }
    }
}  

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}



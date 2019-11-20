var map, infoWindow;
function initMap() {
  
  

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var userCity = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
      map = new google.maps.Map(document.getElementById('mapNearPlaces'), {
      center: userCity ,
      zoom: 15
    });

    var request = {
    location: userCity,
    radius: '5000',
    types: ['restaurant', 'Bars', 'night clubs'],
    };

    infoWindow = new google.maps.InfoWindow;
      console.log(userCity)
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      // map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
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

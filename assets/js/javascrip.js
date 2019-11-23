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
      zoom: 13
    });

    var request = {
    location: userCity,
    radius: '2000',
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
          var request1 = { placeId: place.place_id }  // Here I created my plceId opject
          service.getDetails(request1, function(place, status) {  // here I'm passing the place ID in order to gte the place details
              console.log(status)
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(place)
                var localPlaces = $('#show_details');
                var divImage = $("#show_images")
                var placeImage = $('<img/>')
                placeImage.attr('src', place.photos[0].getUrl({maxWidth: '200', maxHeight: '200'}));
                placeImage.appendTo(divImage)
                var placesName = $("<div>" + localPlaces + "</div><br>")
                localPlaces.append("<br>" + place.name + "<br>" + place.vicinity + "<br>" + place.formatted_phone_number + "<br>")
                var marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location                      
                });
                google.maps.event.addListener(marker, 'click', function() {
                  infoWindow.setContent(place.name);
                  infoWindow.open(map, this);
                });
              }
          });
          
          
      }
  }
}  

// $(document).ready(function(){
//   $("#moreOptions").hide();
//   $("#showMore").click(function(){
//     $("#moreOptions").show()
//   });
// });


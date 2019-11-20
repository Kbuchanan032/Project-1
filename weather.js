var lat, long, gridX, gridY;
lat = 45.518535;
long = -122.672063;

var settings = {
  async: true,
  crossDomain: true,
  url: "https://api.weather.gov/points/" + lat + "," + long,
  method: "GET"
};

$.ajax(settings).done(function(response) {
  console.log(response);
  gridX = response.properties.gridX;
  gridY = response.properties.gridY;
  console.log(gridX);
  console.log(gridY);

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://api.weather.gov/gridpoints/PQR/" + gridX + "," + gridY + "/forecast",
    method: "GET"
  };

  $.ajax(settings).done(function(response) {
		console.log(response);
		
  });
});

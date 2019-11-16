var topics = ["Restaurants", "Bars"]

var totalInfo = 10;
//var location=-33.8670522,151.1957362;
// var radius=500;
// var types=food;
// var name=harbour;
var apiKey = 'AIzaSyAirI4H5b9p94B9ZkgEX0a_r_NIOt5RktY';


$(document).ready(function(){
    

function getInfo(){
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&name=harbour&key='+apiKey,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}

$("#im-bored").click(function(){
    //console.log('click')
    getInfo()
})



})

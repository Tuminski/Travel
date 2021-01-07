$(document).ready(function(){
    $('.modal').modal();
});

function initMap () {
    const slc = { lat: 40.7608, lng: -111.8910 };
    // The map, centered at Salt lake City
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: slc,
    });
    // The marker, positioned at Salt lake city
    const marker = new google.maps.Marker({
      position: slc,
      map: map,
    });
}
// Initialize and add the map
function initMapPark() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const park = new google.maps.Map(document.getElementById("park"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: park,
    });
  }
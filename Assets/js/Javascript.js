$(document).ready(function(){
    $('.modal').modal();
});

function initMap () {
    const slc = { lat: 40.7608, lng: -111.8910 };
    const parkCity= { lat: 40.6461, lng: -111.4980 };
    const bearLake= { lat: 42.0299, lng: -111.3322 };
    const sGeorge= { lat: 37.0965, lng: -113.5684 };
    const zionsN= { lat: 37.2982, lng: -113.0263 };
    // The map, centered at Salt lake City
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: slc,
    });
    const park = new google.maps.Map(document.getElementById("park"), {
        zoom: 10,
        center: parkCity,
    });
    const lake = new google.maps.Map(document.getElementById("lake"), {
        zoom: 10,
        center: bearLake,
    });
    const george = new google.maps.Map(document.getElementById("george"), {
        zoom: 10,
        center: sGeorge,
    });
    const zions = new google.maps.Map(document.getElementById("zions"), {
        zoom: 10,
        center: zionsN,
    });
    // // The marker, positioned at Salt lake city
    // const marker = new google.maps.Marker({
    //   position: slc,
    //   map: map,
    // });
    addMarker({lat: 40.7608, lng: -111.8910 });
    addMarker({lat: 40.6461, lng: -111.4980 });
    addMarker({lat: 42.0299, lng: -111.3322 });
    addMarker({lat: 37.0965, lng: -113.5684 });
    addMarker({lat: 37.2982, lng: -113.0263 });

    function addMarker (coords) {
        var marker = new google.maps.Marker({
            position: coords,
            map: (map, park, lake, george, zions),
        });
    }
}

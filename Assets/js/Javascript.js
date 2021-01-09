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
    addMarker({lat: 40.7608, lng: -111.8910 }, map);
    addMarker({lat: 40.6461, lng: -111.4980 }, park);
    addMarker({lat: 42.0299, lng: -111.3322 }, lake);
    addMarker({lat: 37.0965, lng: -113.5684 }, george);
    addMarker({lat: 37.2982, lng: -113.0263 }, zions);

    function addMarker (coords, targetmap) {
        var marker = new google.maps.Marker({
            position: coords,
            map:targetmap,
        });

    
    }
}

var cities = ["Salt Lake City", "Park City", "Garden City", "St. George", "Kanab" ];

var createWeatherEl = function(iconData) {
    //Weather Icon
    var iconEl = document.createElement('img');
    iconEl.setAttribute("src","http://openweathermap.org/img/w/" + iconData + ".png");
    return iconEl;
};

function getWeather(historySearch="",c) {

        if (historySearch != "") {
            searchTerm = historySearch;
        }

        if (searchTerm != "" || searchTerm != null) {
            fetch(
                'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + ',us&appid=2c1512576f41358397a22bf62cab49d6'
                )
            .then(function(response1) {
                return response1.json();
            })
            .then(function(response1) {
                var cityEl = document.querySelector('#city-'+c)

                var cityNameEl = document.createElement('h5');
                cityNameEl.setAttribute("class", "city-name");
                cityNameEl.textContent = response1.name;
                cityEl.appendChild(cityNameEl);

                fetch(
                    'https://api.openweathermap.org/data/2.5/onecall?lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=2c1512576f41358397a22bf62cab49d6'
                    )
                .then(function(response2) {
                    return response2.json();
                })
                .then(function(response2) {
                    //Create element to hold weather icon
                    var weatherIconEl = document.createElement('img');
                    weatherIconEl.setAttribute("class", "city-icon");
                    // Get the icon id from the api response
                    var weatherIconID = response2.current.weather[0].icon;
                    // Use the icon id to set the image src value
                    weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/" + weatherIconID + ".png");
                    // Add weather element to DOM
                    cityEl.appendChild(weatherIconEl);

                    var weatherTempEl = document.createElement('h6');
                    weatherTempEl.textContent = `Temperature: ${response2.current.temp} °F`;
                    cityEl.appendChild(weatherTempEl);

                    var weatherHumidityEl = document.createElement('h6');
                    weatherHumidityEl.textContent = "Humidity: " + response2.current.humidity;
                    cityEl.appendChild(weatherHumidityEl);

                    var windSpeedEl = document.createElement('h6');
                    windSpeedEl.textContent = "Wind Speed: " + response2.current.wind_speed;
                    cityEl.appendChild(windSpeedEl);

                    // create element for UV Index
                    var uvIndexEl = document.createElement('div');
                    uvIndexEl.setAttribute("class", "uv-index");
                    // UV Index text
                    var uvIndexTextEl = document.createElement('h6');
                    uvIndexTextEl.setAttribute("class", "uv-index-text");
                    uvIndexTextEl.textContent = "UV Index: ";
                    // UV Index value
                    var uvIndexValueEl = document.createElement('h6');
                    uvIndexValueEl.textContent = response2.current.uvi;
                    // Add text and value to element
                    uvIndexEl.appendChild(uvIndexTextEl);
                    uvIndexEl.appendChild(uvIndexValueEl);
                    
                    // Add element to DOM
                    cityEl.appendChild(uvIndexEl);

                    // var forecastEl = document.querySelector('#forecast');
                    // forecastEl.innerHTML = '';
                    // //Display the 5 day forecast using loop
                    // for (i=0; i<5; i++) {
                    //     var forecastDayEl = document.createElement('section')
                        
                    //     forecastDayEl.setAttribute("class", "forecast-day");
                    //         forecastDayEl.appendChild(forecastDate(i));
                    //         forecastDayEl.appendChild(createWeatherEl(response2.daily[i].weather[0].icon));
                    //         forecastDayEl.appendChild(createTempEl(response2.daily[i].temp.max));
                    //         forecastDayEl.appendChild(createHumidityEl(response2.daily[i].humidity));
                        
                    //     //Dynamic id for each forecast day
                    //     var elementId= ('forecast-day-'+i);
                    //     forecastDayEl.setAttribute("id", elementId);
                        
                    //     forecastEl.appendChild(forecastDayEl);
                    // }
                });
            });
        }
    // }
}

for (c = 0; c < cities.length; c++){
    getWeather(cities[c],c);
}
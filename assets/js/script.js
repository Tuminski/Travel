var cities = ["Salt Lake City", "Logan", "Moab", "St George", "Park City"];

var setUviColor = function(uviValue) {
    var color = "";
    if (uviValue <=2) {
        color = '#28ff03';
    } else if (uviValue > 2 && uviValue <= 5) {
        color = 'orange';
    } else {
        color = 'red';
    }
    return color;
};

var createWeatherEl = function(iconData) {
    //Weather Icon
    var iconEl = document.createElement('img');
    iconEl.setAttribute("src","http://openweathermap.org/img/w/" + iconData + ".png");
    return iconEl;
};

// var createCityWeatherEl = function(c) {
//     var cityEl = document.querySelector('#cities');
//     cityEl.innerHTML = '';

//     var cityWeatherEl = document.createElement('div');
//     cityWeatherEl.setAttribute("class","city-weather")
//     cityWeatherEl.setAttribute("id","city-weather-id-"+c)
//     return cityWeatherEl;
//     ;
// };

function getWeather(historySearch="") {

    for (c = 0; c < cities.length; c++){
        // var searchTerm = document.querySelector("#searchTerm").value;
        var searchTerm = cities[c];
        console.log (searchTerm);

        if (historySearch != "") {
            searchTerm = historySearch;
        }

        // var cityEl = createCityWeatherEl(c);

        if (searchTerm != "" || searchTerm != null) {
            fetch(
                'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + ',us&appid=2c1512576f41358397a22bf62cab49d6'
                )
            .then(function(response1) {
                return response1.json();
            })
            .then(function(response1) {
                var currentCityEl = document.querySelector('#current-city');
                currentCityEl.setAttribute("id", "current-city-id-"+c);
                currentCityEl.innerHTML = '';

                var cityNameEl = document.createElement('h2');
                cityNameEl.setAttribute("class", "current-city-name");
                cityNameEl.setAttribute("id", "current-city-name-id-"+c);
                cityNameEl.textContent = response1.name;
                currentCityEl.appendChild(cityNameEl);
                // cityEl.appendChild(cityNameEl);

                // add date
                // var dateEl = document.createElement('h2');
                // var currentDate = new Date();
                // dateEl.textContent = currentDate.toLocaleDateString('en-US');
                // dateEl.setAttribute("class", "current-date");
                // dateEl.setAttribute("id", "current-date-id-"+c);
                // currentCityEl.appendChild(dateEl);
                // cityEl.appendChild(dateEl);

                fetch(
                    'https://api.openweathermap.org/data/2.5/onecall?lat=' + response1.coord.lat + '&lon=' + response1.coord.lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=2c1512576f41358397a22bf62cab49d6'
                    )
                .then(function(response2) {
                    return response2.json();
                })
                .then(function(response2) {
                    //Create element to hold weather icon
                    var weatherIconEl = document.createElement('img');
                    weatherIconEl.setAttribute("class", "current-city-icon");
                    weatherIconEl.setAttribute("id", "current-city-icon-id-"+c);
                    // Get the icon id from the api response
                    var weatherIconID = response2.current.weather[0].icon;
                    // Use the icon id to set the image src value
                    weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/" + weatherIconID + ".png");
                    // Add weather element to DOM
                    currentCityEl.appendChild(weatherIconEl);
                    // cityEl.appendChild(weatherIconEl);

                    var currentWeatherEl = document.querySelector('#current-weather');
                    currentWeatherEl.innerHTML = '';

                    var weatherTempEl = document.createElement('h4');
                    weatherTempEl.textContent = `Temperature: ${response2.current.temp} °F`;
                    weatherTempEl.setAttribute("id", "temperature-id-"+c);
                    currentWeatherEl.appendChild(weatherTempEl);

                    var weatherHumidityEl = document.createElement('h4');
                    weatherHumidityEl.textContent = "Humidity: " + response2.current.humidity;
                    weatherHumidityEl.setAttribute("id", "humidty-id-"+c);
                    currentWeatherEl.appendChild(weatherHumidityEl);

                    var windSpeedEl = document.createElement('h4');
                    windSpeedEl.textContent = "Wind Speed: " + response2.current.wind_speed;
                    windSpeedEl.setAttribute("id", "wind-speed-id-"+c);
                    currentWeatherEl.appendChild(windSpeedEl);

                    // create element for UV Index
                    var uvIndexEl = document.createElement('div');
                    uvIndexEl.setAttribute("class", "uv-index");
                    uvIndexEl.setAttribute("id", "uvi-id-"+c);
                    // UV Index text
                    var uvIndexTextEl = document.createElement('h4');
                    uvIndexTextEl.setAttribute("class", "uv-index-text");
                    uvIndexTextEl.setAttribute("id", "index-text-id-"+c);
                    uvIndexTextEl.textContent = "UV Index: ";
                    // UV Index value
                    var uvIndexValueEl = document.createElement('h4');
                    uvIndexValueEl.textContent = response2.current.uvi;
                    uvIndexValueEl.setAttribute("class", "uv-index-value");
                    uvIndexValueEl.setAttribute("id", "index-value-id-"+c);
                    uvIndexValueEl.setAttribute('style', 'background-color: '+setUviColor(response2.current.uvi) );
                    // Add text and value to element
                    uvIndexEl.appendChild(uvIndexTextEl);
                    uvIndexEl.appendChild(uvIndexValueEl);
                    // Add element to DOM
                    currentWeatherEl.appendChild(uvIndexEl);

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
    }
}

getWeather();
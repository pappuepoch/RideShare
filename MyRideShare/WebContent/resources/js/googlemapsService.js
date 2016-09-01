"use strict";

var GoogleMapService = (function () {
    //const google = "";  //Resharper issue workaround, Disable before run
    let googleMapKey = "";
    let openWeatherMapKey = "";
    let mapDiv = "";
    let defaultLocation = "";


    function initGoogleMapService(googleMapKeyParam, openWeatherMapKeyParam, mapDivParam, defaultLatitude, defaultLongitude) {
        googleMapKey = googleMapKeyParam;
        openWeatherMapKey = openWeatherMapKeyParam;
        mapDiv = mapDivParam;
        defaultLocation = new google.maps.LatLng(defaultLatitude, defaultLongitude);

        return initGoogleMapWithLocation(defaultLocation);
    }

    function initGoogleMapPlaceAutoComplete(googleMap, inputControl) {
        const inputAutoComplete = new google.maps.places.Autocomplete(inputControl);
        inputAutoComplete.bindTo('bounds', googleMap);
    }

    function initGoogleMapWithLocation(location) {
        return new google.maps.Map(document.getElementById(mapDiv),
        {
            center: location,
            zoom: 10 //City Level
        });
    }

    function addMarker(googleMap, location, animation) {
        return new google.maps.Marker({
            map: googleMap,
            position: location,
            draggable: false,
            animation: animation //google.maps.Animation.DROP, google.maps.Animation.BOUNCE
        });
    }

    function addMarkerOnMapClick(googleMap) {
        googleMap.addListener('click',
            function (e) {
                addMarker(googleMap, e.latLng, google.maps.Animation.DROP);
                googleMap.panTo(e.latLng);
            });

        return e.latLng;
    }

    function showInfoWindowWithMarkup(googleMap, location, textToShow, showImmediately, markerAnimation) {
        const infoWindow = new google.maps.InfoWindow();

        //infoWindow.setPosition(location);     //Enable this line if you do not link the infoWindow eith the Marker
        infoWindow.setContent(textToShow);

        const marker = addMarker(googleMap, location, markerAnimation);     //google.maps.Animation.BOUNCE, google.maps.Animation.DROP
        marker.addListener('click', function () { infoWindow.open(googleMap, marker); });

        if (showImmediately === true)
            infoWindow.open(googleMap, marker);
    }

    function showLocationOnGoogleMap(location, textToShow, showImmediately, markerAnimation) {
        const googleMap = initGoogleMapWithLocation(location);
        showInfoWindowWithMarkup(googleMap, location, textToShow, showImmediately, markerAnimation);
    }

    function showLocationByAddressOnGoogleMap(address, textToShow, showImmediately, markerAnimation, callbackFunction) {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ "address": address },
            function (results, status) {
                if (status === "OK") {
                    showLocationOnGoogleMap(results[0].geometry.location, textToShow, showImmediately, markerAnimation);       //results[0].formatted_address

                    if (callbackFunction != undefined)
                        callbackFunction(results[0]);
                }
                else if (status === "ZERO_RESULTS") {
                    alert("Location Not Found!");
                }
                else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
    }

    function showCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                showLocationOnGoogleMap(currentLocation, "My Current Location Found!", false, google.maps.Animation.BOUNCE);
            },
                function () {
                    showLocationOnGoogleMap(defaultLocation, "Error: The Geolocation service failed!", true, google.maps.Animation.DROP);
                });
        }
        else {
            // Browser doesn't support Geolocation
            showLocationOnGoogleMap(defaultLocation, "Error: Your browser does not support geolocation!", true, google.maps.Animation.DROP);
        }
    }

    function showCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                showWeatherByLocation(position.coords.latitude, position.coords.longitude);
            },
                function () {
                    showLocationOnGoogleMap(defaultLocation, "Error: The Geolocation service failed!", true, google.maps.Animation.DROP);
                });
        }
        else {
            // Browser doesn't support Geolocation
            showLocationOnGoogleMap(defaultLocation, "Error: Your browser does not support geolocation!", true, google.maps.Animation.DROP);
        }
    }

    function showCurrentLocationWeatherForecast() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                showWeatherByLocation(position.coords.latitude, position.coords.longitude);
            },
                function () {
                    showWeatherForecastByLocation(defaultLocation, "Error: The Geolocation service failed!", true, google.maps.Animation.DROP);
                });
        }
        else {
            // Browser doesn't support Geolocation
            showLocationOnGoogleMap(defaultLocation, "Error: Your browser does not support geolocation!", true, google.maps.Animation.DROP);
        }
    }


    function findRouteByLocation(originAddressLatitude, originAddressLongitude, destinationAddressLatitude, destinationAddressLongitude, googleMap) {
        const originAddress = new google.maps.LatLng(originAddressLatitude, originAddressLongitude);
        const destinationAddress = new google.maps.LatLng(destinationAddressLatitude, destinationAddressLongitude);

        findRouteByAddress(originAddress, destinationAddress, googleMap);
    }   

    function findRouteByAddress(originAddress, destinationAddress, googleMap, callbackFunction) {
        if (googleMap == undefined)                                   //Do not initGoogleMapWithLocation so you can support find multiple routs
            googleMap = initGoogleMapWithLocation(originAddress);     //passing wrong address is okay as it will be overriden below by "directionsDisplay"

        const directionsService = new google.maps.DirectionsService;
        const directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(googleMap);

        directionsService.route({
            origin: originAddress, destination: destinationAddress,
            travelMode: "DRIVING",                                                 //DRIVING, BICYCLING, TRANSIT, WALKING
            unitSystem: google.maps.UnitSystem.METRIC
        }, function (result, status) {        //UnitSystem.IMPERIAL(kilometers), UnitSystem.METRIC(miles)
            if (status === "OK") {
                directionsDisplay.setDirections(result);

                if (callbackFunction != undefined)
                    callbackFunction({
                        OriginAddressLatitude: result.routes[0].legs[0].start_location.lat(),
                        OriginAddressLongitude: result.routes[0].legs[0].start_location.lng(),
                        DestinationAddressLatitude: result.routes[0].legs[0].end_location.lat(),
                        DestinationAddressLongitude: result.routes[0].legs[0].end_location.lng()
                    });
            }
            else if ((status === "NOT_FOUND") || (status === "ZERO_RESULTS")) {
                alert("Route Not Found!   " + originAddress + " ==> " + destinationAddress);
            }
            else {
                alert("Directions request failed due to: " + status + "    " +originAddress + " ==> " + destinationAddress);
            }
        });
    }


    function showWeatherByAddress(address) {
        const weatherURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + openWeatherMapKey + "&q=" + address + "&units=imperial&type=accurate";
        getWeather(weatherURL);
    }

    function showWeatherByLocation(latitude, longitude) {
        const weatherURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + openWeatherMapKey + "&lat=" + latitude + "&lon=" + longitude + "&units=imperial&type=accurate";
        getWeather(weatherURL);
    }

    function getWeather(weather_API_URL) {
        $.getJSON(weather_API_URL, function (data) {
            if (data.cod === "404") {
                alert("Location Not Found!");
                return;
            }

            const location = new google.maps.LatLng(data.coord.lat, data.coord.lon);
            const markerIcon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

            const googleMap = initGoogleMapWithLocation(location);
            showInfoWindowWithMarkup(googleMap,
                location,
                "<img src=" + markerIcon + ">" +
                "<br /><strong>" +
                data.name +
                "</strong>" + "<br />" +
                data.main.temp +
                "&deg;F" + "<br />" +
                data.weather[0].main,
                true, google.maps.Animation.DROP);
        });
    }


    function showWeatherForecastByAddress(address) {
        const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?appid=" + openWeatherMapKey + "&q=" + address + "&units=imperial&type=accurate";
        getWeatherForecast(weatherURL);
    }

    function showWeatherForecastByLocation(latitude, longitude) {
        const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?appid=" + openWeatherMapKey + "&lat=" + latitude + "&lon=" + longitude + "&units=imperial&type=accurate";
        getWeatherForecast(weatherURL);
    }

    function getWeatherForecast(weather_API_URL) {
        $.getJSON(weather_API_URL, function (data) {
            if (data.cod === "404") {
                alert("Location Not Found!");
                return;
            }

            let weatherForecastResult = "<strong>" + data.city.name + " " + "</strong> <br /><br />";

            for (let i = 0; i < 5; i++) {
                weatherForecastResult += "<img src=" + "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" + ">" +
                data.list[i].main.temp + " " +
                "&deg;F " +
                data.list[i].weather[0].main + "<br />";
            }

            const location = new google.maps.LatLng(data.city.coord.lat, data.city.coord.lon);
            const googleMap = initGoogleMapWithLocation(location);
            showInfoWindowWithMarkup(googleMap,
                location,
                weatherForecastResult,
                true, google.maps.Animation.DROP);
        });
    }


    //Expose The Public Methods
    return {
        initGoogleMapService: initGoogleMapService,
        initGoogleMapWithLocation: initGoogleMapWithLocation,
        addMarker: addMarker,
        addMarkerOnMapClick: addMarkerOnMapClick,
        showInfoWindowWithMarkup: showInfoWindowWithMarkup,
        showLocationOnGoogleMap: showLocationOnGoogleMap,
        showLocationByAddressOnGoogleMap: showLocationByAddressOnGoogleMap,
        showCurrentLocation: showCurrentLocation,
        showCurrentLocationWeather: showCurrentLocationWeather,
        showCurrentLocationWeatherForecast: showCurrentLocationWeatherForecast,
        findRouteByAddress: findRouteByAddress,
        findRouteByLocation: findRouteByLocation,
        showWeatherByAddress: showWeatherByAddress,
        showWeatherByLocation: showWeatherByLocation,
        showWeatherForecastByAddress: showWeatherForecastByAddress,
        showWeatherForecastByLocation: showWeatherForecastByLocation,
        initGoogleMapPlaceAutoComplete: initGoogleMapPlaceAutoComplete,
        defaultLocation: defaultLocation,
        googleMapKey: googleMapKey
    }

})();
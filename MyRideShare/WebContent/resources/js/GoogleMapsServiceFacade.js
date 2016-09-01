"use strict";

var GoogleMapServiceFacade = (function () {
    //const google = "";  //Resharper issue workaround, Disable before run
    const googleMapKey = "AIzaSyDYyVfBbxBp2RfkKi0RQysjKWAKSNtyQa8";
    const openWeatherMapKey = "6697e09d50a13bfd873bc8db13cbb75c";
    const mapDiv = "map";
    let defaultLocation;


    function initGoogleMapServiceFacade() {
        initGoogleMapServiceFacade_Prod();
       // initGoogleMapService_Test();
    }

    function initGoogleMapServiceFacade_Prod() {
        GoogleMapService.initGoogleMapService(googleMapKey, openWeatherMapKey, mapDiv, 30.064742, 31.249509);       //Set the DefaultLocation Cairo Location
        GoogleMapService.initGoogleMapPlaceAutoComplete($("#txt_originAddress")[0], $("#txt_destinationAddress")[0]);
        const userCity = $("#userCity").val();
        if (userCity == undefined)
            GoogleMapService.showCurrentLocationWeather();
        else
            GoogleMapService.showWeatherByAddress(userCity);


        $("#btn_locate")
            .click(function () {
                const address = $("#txt_address").val();
                
                if ($('#chk_forcast').is(":checked")){
                
                	GoogleMapService.showWeatherForecastByAddress(address);
                }
                else
                	GoogleMapService.showWeatherByAddress(address);
                
            });

        $("#btn_findRoute")
            .click(function () {
                const originAddress = $("#txt_originAddress").val();
                const destinationAddress = $("#txt_destinationAddress").val();
                GoogleMapService.findRouteByAddress(originAddress, destinationAddress);
            });
    }

    function initGoogleMapService_Test() {
        GoogleMapService.initGoogleMapService(googleMapKey, openWeatherMapKey, mapDiv, 30.064742, 31.249509);       //Set the DefaultLocation Cairo Location

        GoogleMapService.showLocationOnGoogleMap(defaultLocation, "Location Found", true);
        GoogleMapService.showCurrentLocation();

        $("#btn_locate")
            .click(function () {
                const address = $("#txt_address").val();
                GoogleMapService.showLocationByAddressOnGoogleMap(address, "Address Found", false, google.maps.Animation.BOUNCE, function (e) { console.log(e.geometry.location.lat() + " " + e.geometry.location.lng()); });
                //GoogleMapService.showWeatherByAddress(address);
                //GoogleMapService.showWeatherForecastByAddress(address);
            });

        $("#btn_findRoute")
            .click(function () {
                const originAddress = $("#txt_originAddress").val();
                const destinationAddress = $("#txt_destinationAddress").val();

                //Show multiple routs
                const googleMap = GoogleMapService.initGoogleMapWithLocation(defaultLocation);
                GoogleMapService.findRouteByLocation(30.0447068, 31.23598219, 31.1997895, 29.9185042);
                //GoogleMapService.findRouteByAddress(originAddress, destinationAddress, googleMap, function (e) { console.log(e.OriginAddressLatitude + " " + e.OriginAddressLongitude + " " + e.DestinationAddressLatitude + " " + e.DestinationAddressLongitude); });
                //GoogleMapService.findRouteByAddress("Hurghada", "Aswan", googleMap);
            });
    }


    return {
        initGoogleMapServiceFacade: initGoogleMapServiceFacade,
        initGoogleMapServiceFacade_Prod: initGoogleMapServiceFacade_Prod,
        initGoogleMapService_Test: initGoogleMapService_Test
    }

})();
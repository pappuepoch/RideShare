"use strict";

var GoogleMapServiceFacade = (function () {
     const google = "";  //Resharper issue workaround, Disable before run
   const googleMapKey = "AIzaSyDYyVfBbxBp2RfkKi0RQysjKWAKSNtyQa8";
	//const googleMap = GoogleMapService.initGoogleMapWithLocation(GoogleMapService.defaultLocation);
	
    const openWeatherMapKey = "6697e09d50a13bfd873bc8db13cbb75c";
    const mapDiv = "map";
    let defaultLocation;


    function initGoogleMapServiceFacade() {
    	const googleMap = GoogleMapService.initGoogleMapService(googleMapKey, openWeatherMapKey, mapDiv, 30.064742, 31.249509);       //Set the DefaultLocation Cairo Location
    	
    	const routes = new Array(
                { originAddress: "Cairo", destinationAddress: "Helwan" },
                { originAddress: "Qaha", destinationAddress: "Banha" },
                { originAddress: "Badr City", destinationAddress: "Madinaty" },
                { originAddress: "Bahtit", destinationAddress: "EL Shorouk" },
                { originAddress: "New Cairo City", destinationAddress: "October City"},
                { originAddress: "Ain Shams", destinationAddress: "Abu Zabal"},
                { originAddress: "Marsafa", destinationAddress: "Ibrash"},
                { originAddress: "Ashmun", destinationAddress: "Minuf"},
                { originAddress: "Dijwi", destinationAddress: "Qalama"},
                { originAddress: "Isnit", destinationAddress: "Naser City"}
            );
    	
    	let index = 0;
        let timerID = setInterval(function () {
            GoogleMapService.findRouteByAddress(routes[index].originAddress, routes[index].destinationAddress, googleMap);
            index++;
            
            if (index === routes.length) {
                clearInterval(timerID);
            }
        }, 500);  
    }

    return {
        initGoogleMapServiceFacade: initGoogleMapServiceFacade,
    }

})();
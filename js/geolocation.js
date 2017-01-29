document.addEventListener("deviceready", function() {

    var onSuccess = function(position) {
        $("#dfLatitude").val(position.coords.latitude);
        $("#dfLongitude").val(position.coords.longitude);
        
        /*$("#altitude").val(position.coords.altitude);
        $("#accuracy").val(position.coords.accuracy);
        $("#altitudeAccuracy").val(position.coords.altitudeAccuracy);
        $("#heading").val(position.coords.heading);
        $("#speed").val(position.coords.speed); */
        $("#timestamp").val(position.timestamp);

        $.mobile.loading("hide");
    };

    function onError(error) {
        alert("Código: "    + error.code    + "\n" +
            "Mensagem: " + error.message + "\n");

        $("#getCurrentLocation").button("enable");
        $("#watchGeolocation").button("enable");
        $("#stopWatchingGeolocation").button("disable");

        $.mobile.loading("hide");
    }

    function getOptions() {
        var enableHighAccuracy = ($("#highAccuracy").val() === "true");
        var maximumAge = parseInt($("#maximumAge").val());
        var timeout = parseInt($("#geolocationTimeout").val());

        return {
            maximumAge: maximumAge,
            timeout: timeout,
            enableHighAccuracy: enableHighAccuracy
        }
    }

    $(document).on("click", "#getCurrentLocation", function() {
        $.mobile.loading("show");
        navigator.geolocation.getCurrentPosition(onSuccess, onError, getOptions());
    });

    var watchId;

}, false);

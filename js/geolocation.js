document.addEventListener("deviceready", function() {

    var onSuccess = function(position) {
        $("#dfLatitude").html(position.coords.latitude);
        $("#dfLongitude").html(position.coords.longitude);
        
        /*$("#altitude").val(position.coords.altitude);
        $("#accuracy").val(position.coords.accuracy);
        $("#altitudeAccuracy").val(position.coords.altitudeAccuracy);
        $("#heading").val(position.coords.heading);
        $("#speed").val(position.coords.speed); */
        $("#timestamp").html(position.timestamp);

        //$.mobile.loading("hide");
    };

    function onError(error) {
        alert("Código: "    + error.code    + "\n" +
            "Mensagem: " + error.message + "\n");

        $("#getCurrentLocation").button("enable");
        $("#watchGeolocation").button("enable");
        $("#stopWatchingGeolocation").button("disable");

        //$.mobile.loading("hide");
    }

    function getOptions() {
        
        alert("Navigator foi executado com sucesso");

    }

    $(document).on("click", "#getCurrentLocation", function() {

        alert("Você clicou no botão");
        
        //$.mobile.loading("show");
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError, getOptions());
    });

    //var watchId;

}, false);

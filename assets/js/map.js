var queryURL = "https://data.austintexas.gov/resource/thy5-qknh.json";

var data = new Firebase("https://reaustin.firebaseio.com/");
$(".all").html(hPage);
//=====================================================================
function initBinMap() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "js/infobox.js";
    $("head").append(s);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.2669444,
            lng: -97.7427778
        },
        zoom: 17
    });

    $.ajax({
        url: queryURL,
        method: 'GET',
        content: 'application/json'
    }).done(function(response) {

        var infoWindow = new google.maps.InfoWindow({
            map: map
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.close();
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        for (var i = 0; i < response.length; i++) {

            var bizName = (response[i].business_name);
            var longitude = (response[i].longitude);
            var latitude = (response[i].latitude);

            function initMap(longitude, latitude) {
                console.log("I'm running!");
                var myLatLng = {
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                };



                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: {
                        anchor: new google.maps.Point(16, 16),
                        url: 'data:image/svg+xml;utf-8, \
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.29 53.26"><defs><style>.cls-1{fill:#2250d1;}</style></defs><title>gmMARKERblue-01</title><polygon class="cls-1" points="4.04 27.15 16.64 53.26 29.23 27.15 4.04 27.15"/> \
                            <path class="cls-1" d="M16.64,0A16.64,16.64,0,1,0,33.29,16.64,16.64,16.64,0,0,0,16.64,0ZM16.46,24.77l-6.71-.14L6.49,18.72l1.72-2.9-1-.69,4.08,0.16,1.94,3.53-1.08-.58-0.72,1.57L16.57,20Zm0.2-14L14,15.19,9.87,12.86l3.36-5.71H20L21.7,10l1.11-.44-2.11,3.64h-4l1-.86Zm6.85,13.59-3.37.06,0,1.25-2-3.55,2-3.51,0.08,1.22,1.71-.22-2.52-4.53,4.07-2.39,3.41,5.78Z"/> \
                            </svg>'
                    }
                });
            }
            initMap(longitude, latitude);

        }

    });

    data.on("child_added", function(snapshot) {
        // Get latitude and longitude from the cloud.
        var newPosition = snapshot.val().position;

        // Create a google.maps.LatLng object for the position of the marker.
        // A LatLng object literal (as above) could be used, but the heatmap
        // in the next step requires a google.maps.LatLng object.
        var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

        // Place a marker at that location.
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                anchor: new google.maps.Point(16, 16),
                url: 'data:image/svg+xml;utf-8, \
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.29 53.26"><defs><style>.cls-1{fill:#24ce24;}</style></defs><title>gmMARKERgreen</title><polygon class="cls-1" points="4.04 27.15 16.64 53.26 29.23 27.15 4.04 27.15"/> \
                        <path class="cls-1" d="M16.64,0A16.64,16.64,0,1,0,33.29,16.64,16.64,16.64,0,0,0,16.64,0ZM16.46,24.77l-6.71-.14L6.49,18.72l1.72-2.9-1-.69,4.08,0.16,1.94,3.53-1.08-.58-0.72,1.57L16.57,20Zm0.2-14L14,15.19,9.87,12.86l3.36-5.71H20L21.7,10l1.11-.44-2.11,3.64h-4l1-.86Zm6.85,13.59-3.37.06,0,1.25-2-3.55,2-3.51,0.08,1.22,1.71-.22-2.52-4.53,4.07-2.39,3.41,5.78Z"/> \
                        </svg>'
            }
        });

        var name = snapshot.val().userName;
        var binType = snapshot.val().binType;
        var comments = snapshot.val().comments;

        var html = "<div id='iw-container'>" + "<div class='iw-title'><h5>Bin Info</h5></div>" + "<table id='map-popup' class='iw-content'>" +
            "<tr><td class='iw-subTitle'>Pinned by:</td> <td>" + name + "</td> </tr>" +
            "<tr><td class='iw-subTitle'>Type of Bin:</td> <td>" + binType + "</td></tr>" +
            "<tr><td class='iw-subTitle'>" + name + "'s comments:</td><td>" + comments + "</td></tr><div class='iw-bottom-gradient'></div></table></div>";


        var infowindow = new google.maps.InfoWindow({
            content: html
        });

        marker.addListener('mouseover', function() {
            infowindow.open(map, this);
        });

        marker.addListener('mouseout', function() {
            infowindow.close();
        })


    });
}

//=====================================================================

function initContributeMap() {
    var marker;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.2669444,
            lng: -97.7427778
        },
        zoom: 17
    });

    $.ajax({
        url: queryURL,
        method: 'GET',
        content: 'application/json'
    }).done(function(response) {

        var infoWindow = new google.maps.InfoWindow({
            map: map
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.close();
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        for (var i = 0; i < response.length; i++) {

            var bizName = (response[i].business_name);
            var longitude = (response[i].longitude);
            var latitude = (response[i].latitude);

            function initMap(longitude, latitude) {
                console.log("I'm running!");
                var myLatLng = {
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                };

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: {
                        anchor: new google.maps.Point(16, 16),
                        url: 'data:image/svg+xml;utf-8, \
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.29 53.26"><defs><style>.cls-1{fill:#2250d1;}</style></defs><title>gmMARKERblue-01</title><polygon class="cls-1" points="4.04 27.15 16.64 53.26 29.23 27.15 4.04 27.15"/> \
                            <path class="cls-1" d="M16.64,0A16.64,16.64,0,1,0,33.29,16.64,16.64,16.64,0,0,0,16.64,0ZM16.46,24.77l-6.71-.14L6.49,18.72l1.72-2.9-1-.69,4.08,0.16,1.94,3.53-1.08-.58-0.72,1.57L16.57,20Zm0.2-14L14,15.19,9.87,12.86l3.36-5.71H20L21.7,10l1.11-.44-2.11,3.64h-4l1-.86Zm6.85,13.59-3.37.06,0,1.25-2-3.55,2-3.51,0.08,1.22,1.71-.22-2.52-4.53,4.07-2.39,3.41,5.78Z"/> \
                            </svg>'
                    }
                });
            }
            initMap(longitude, latitude);

        }

        // console.log(response.map(function (value) {
        //  return value.zone;
        // }));

    });


    var html = "<div id='iw-container'>" + "<div class='iw-title'><h5>Add your bin</h5></div>" + "<table id='map-popup' class='iw-content'>" +
        "<tr><td class='iw-subTitle'>Your Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
        "<tr><td class='iw-subTitle'>Type of Bin:</td> <td><select id='binType' style='display: block'>" +
        "<option value='Public'>Public Bin</option>" +
        "<option value='Private'>Private Bin</option>" +
        "</select> </td></tr>" +
        "<tr><td class='iw-subTitle'>Additional Comments:</td> <td><input type='text' id='comments'/> </td></tr>" +
        "<tr><td><input type='button' value='Save-&-Close' id='submit'/></td></tr>" + "<div class='iw-bottom-gradient'></div></table></div>";

    var infowindow = new google.maps.InfoWindow({
        content: html,
    });

    google.maps.event.addListener(map, 'click', function(event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        google.maps.event.addListener(marker, "click", function() {
            infowindow.open(map, marker);
            $("body").on('click', '#submit', function() {
                var name = $("#name").val();
                var binType = $("#binType").val();
                var comments = $("#comments").val();
                var position = {
                    lat: marker.position.lat(),
                    lng: marker.position.lng()
                };

                if (name.length === 0 && comments.length === 0) {
                    alert("Please enter information!");
                } else {
                    console.log("data is written");
                    data.push({
                        userName: name,
                        binType: binType,
                        comments: comments,
                        position: position
                    })
                    infowindow.close();
                }

            });
        });
    });



    data.on("child_added", function(snapshot) {
        // Get latitude and longitude from the cloud.
        var newPosition = snapshot.val().position;

        // Create a google.maps.LatLng object for the position of the marker.
        // A LatLng object literal (as above) could be used, but the heatmap
        // in the next step requires a google.maps.LatLng object.
        var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

        // Place a marker at that location.
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                anchor: new google.maps.Point(16, 16),
                url: 'data:image/svg+xml;utf-8, \
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.29 53.26"><defs><style>.cls-1{fill:#24ce24;}</style></defs><title>gmMARKERgreen</title><polygon class="cls-1" points="4.04 27.15 16.64 53.26 29.23 27.15 4.04 27.15"/> \
                        <path class="cls-1" d="M16.64,0A16.64,16.64,0,1,0,33.29,16.64,16.64,16.64,0,0,0,16.64,0ZM16.46,24.77l-6.71-.14L6.49,18.72l1.72-2.9-1-.69,4.08,0.16,1.94,3.53-1.08-.58-0.72,1.57L16.57,20Zm0.2-14L14,15.19,9.87,12.86l3.36-5.71H20L21.7,10l1.11-.44-2.11,3.64h-4l1-.86Zm6.85,13.59-3.37.06,0,1.25-2-3.55,2-3.51,0.08,1.22,1.71-.22-2.52-4.53,4.07-2.39,3.41,5.78Z"/> \
                        </svg>'
            }
        });

        var name = snapshot.val().userName;
        var binType = snapshot.val().binType;
        var comments = snapshot.val().comments;

        var html = "<div id='iw-container'>" + "<div class='iw-title'><h5>Bin Info</h5></div>" + "<table id='map-popup' class='iw-content'>" +
            "<tr><td class='iw-subTitle'>Pinned by:</td> <td>" + name + "</td> </tr>" +
            "<tr><td class='iw-subTitle'>Type of Bin:</td> <td>" + binType + "</td></tr>" +
            "<tr><td class='iw-subTitle'>" + name + "'s comments:</td><td>" + comments + "</td></tr><div class='iw-bottom-gradient'></div></table></div>";


        var infowindow = new google.maps.InfoWindow({
            content: html
        });


        marker.addListener('mouseover', function() {
            infowindow.open(map, this);
        });

        marker.addListener('mouseout', function() {
            infowindow.close();
        })


    });


}

//============================================================================

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
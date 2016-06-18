var binSec = '<div class="fluid-container" id="binSection" data-sec="index-banner"><div id="map"></div>';
var conSec = '<div class="fluid-container" id="contributeSection" data-sec="index-banner"><div id="map"></div></div>';
var abtUsSec = ' <div class="fluid-container binHide" id="abtUsSection" data-sec="index-banner"><div class="section"><div class="row"><div class="col s12 center"><img src="assets/img/about.png" style="width: 700px"></div></div></div>';
var pU = '<div class="row popupBins"><div  id="sideBarComments" class="col s12 push-s9 push-m11 hoverable circle valign-wrapper right"><div class="xbuttonIcon"><i class="fa fa-times fa-2x xbi"></i></div><i class="material-icons small valign bbuttonIcon">view_list</i><ul class="collapsible popout" data-collapsible="accordion"><li><div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li><li><div class="collapsible-header"><i class="material-icons">place</i>Second</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li><li><div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li></ul></div></div>';
var hPage = '<div id="index-banner" class="parallax-container binHide"><div class="section no-pad-bot"> <div class="container white-bg"> <br><br><h1 class="header center green-text text-darken-2">re<i class="fa fa-recycle" aria-hidden="true"></i>USTIN<div class="row center"><h5 class="header col s12 green-text light text-darken-2">r e d u c e  .  r e u s e  .  r e c y c l e</h5></div></h1><div class="row center"><a href="#" class="btn-large waves-effect waves-light green binButton">Search for Bins</a></div><br><br></div></div><div class="parallax"><img src="assets/img/background1.jpg" alt="Unsplashed background img 1"></div></div>';
var userMarker = [];
var queryURL = "https://data.austintexas.gov/resource/thy5-qknh.json";

$(document).ready(function() {

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
                lat: -34.397,
                lng: 150.644
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

                    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: bizName,
                        icon: image
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
                map: map
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
                lat: -34.397,
                lng: 150.644
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


                    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: bizName,
                        icon: image
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

                        if(name.length === 0 && comments.length === 0){
                            alert("Please enter information!"); 
                        } else{
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
                map: map
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
    //=========================binSection===================================
    $("body").on('click', '.binButton', function(event) {
        event.preventDefault();
        $(".all").hide(800, function() {
            $(".all").html(binSec).show(0, function() {
                initBinMap();
            });;

        });
    });


    $("body").on('click', '.bbuttonIcon', function(event) {
        event.preventDefault();
        $("#sideBarComments").removeClass("hoverable");
        $(".bbuttonIcon").css('display', 'none');
        $("#sideBarComments").animate({
            marginTop: '0%',
            marginLeft: '-30%',
            width: '35%',
            height: '400px',
            borderRadius: '0%',
            backgroundColor: '#2980b9',
            backgroundColor: 'rgba(41, 128, 185, 0.6)',
        }, 1000).delay(0)
            .queue(function(n) {
                $("#sideBarComments").removeClass("valign-wrapper hoverable");

                $(".xbuttonIcon").css('display', 'inline-block');
                $(".popout").css('display', 'inline-block');
                n();
            });
    });
    $("body").on('click', '.xbi', function(event) {
        event.preventDefault();
        $("#sideBarComments").removeClass("hoverable");
        $(".xbuttonIcon").css('display', 'none');
        $(".popout").css('display', 'none');
        $("#sideBarComments").animate({
            marginLeft: '0',
            height: '50px',
            width: '50px',
            marginTop: '300px',
            backgroundColor: '#2980b9',
            borderRadius: '50%',
        }, 1000).delay(0)
            .queue(function(n) {
                $("#sideBarComments").addClass("valign-wrapper hoverable");
                $(".bbuttonIcon").css('display', 'inline-block');
                n();
            });
    });
    $("body").on('mouseover', '.xbuttonIcon', function(event) {
        $("#sideBarComments").addClass("hoverable");
    });

    //=========================contributeSection====================

    $("body").on('click', '.contributeButton', function(event) {
        event.preventDefault();
        $(".all").hide(800, function() {
            $(".all").html(conSec).show(0, function() {
                initContributeMap();
            });;
        });
    });



    //========================abtUsSection===========================
    $("body").on('click', '.abtUsButton', function(event) {
        event.preventDefault();
        $(".all").hide(800, function() {
            $(".all").html(abtUsSec).show(0, function() {});;
        });
    });

    //===========================homePage==============================
    $("body").on('click', '#logo-container', function(event) {
        event.preventDefault();
        $(".all").hide(800, function() {
            $(".all").html(hPage).show(0, function() {});;
        });
    });

    $('.scrollspy').scrollSpy();
});
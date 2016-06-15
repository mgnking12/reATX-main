$(document).ready(function() {

    var data = new Firebase("https://reaustin.firebaseio.com/");

//=====================================================================
    function initBinMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 17
      });
        var infoWindow = new google.maps.InfoWindow({map: map});

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
    }

//=====================================================================
    
    function initContributeMap(){
        var marker;

        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 17
        });

         var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              // infoWindow.close();
              map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        // function placeMarker(location) {
           
        // }

        var html ="<table id='map-popup'>" +
        "<tr><td>Your Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
        "<tr><td>Type of Bin:</td> <td><select id='binType' style='display: block'>" +
        "<option value='publicBin'>Public Bin</option>" +
        "<option value='privateBin'>Private Bin</option>" +
        "</select> </td></tr>" +
        "<tr><td>Additional Comments:</td> <td><input type='text' id='comments'/> </td></tr>" +
        "<tr><td><input type='button' value='Save-&-Close' id='submit'/></td></tr>";

       var infowindow = new google.maps.InfoWindow({
            content: html
        });
       
        google.maps.event.addListener(map, 'click', function(event) {
            marker = new google.maps.Marker({
                position: event.latLng, 
                map: map
            });
            google.maps.event.addListener(marker, "click", function() {
                infowindow.open(map, marker);
                $("body").on('click', '#submit', function(){
                    var name = $("#name").val();
                    var binType = $("#binType").val();
                    var comments = $("#comments").val();
                    var position = {lat: marker.position.lat(), lng:marker.position.lng()};
                    data.push({
                        userName: name,
                        binType: binType,
                        comments: comments,
                        position: position
                    })

                    infowindow.close();

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
        });

    }


//======================================================================

        //Function to pull up table for the marker
    

        // function saveData() {
        //     var name = $("#name").val().trim();
        //     var type = $("#type").val().trim();
        //     var latlng = marker.getPosition();
            
        //     data.push({
        //         name: name,
        //         type: type,
        //         position: latlng,
        //         dateAdded: Firebase.ServerValue.TIMESTAMP
        //     }); 
        // }


//============================================================================

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

//====================================================================
    $("body").on('click', '.binButton', function(event) {
        initBinMap();
        event.preventDefault();
        console.log("bins")
        $("#contributeSection").attr("data-sec", "bin");
        $("#signUpSection").attr("data-sec", "bin");
        $("#index-banner").attr("data-sec", "bin");
        if ($("#binSection").attr("data-sec") == "signUp") {
            $("#signUpSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#binSection").fadeIn(0);
                n();
            });
        } else if ($("#binSection").attr("data-sec") == "contribute") {
            $("#contributeSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#binSection").fadeIn(0);
                n();
            });
        } else if ($("#binSection").attr("data-sec") == "index-banner") {
            $("#index-banner").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#binSection").fadeIn(0);
                n();
            });
        }
        //$("#binSection").append("<div class='col s1' id='sideBarComments'>")
    });

//=============================Contribute Page=================================
        
    $("body").on('click', '.contributeButton', function(event) {
        initContributeMap();
        // This event listener calls addMarker() when the map is clicked.
        event.preventDefault();
        console.log("bins")
        $("#contributeSection").attr("data-sec", "bin");
        $("#signUpSection").attr("data-sec", "bin");
        $("#index-banner").attr("data-sec", "bin");
        if ($("#binSection").attr("data-sec") == "signUp") {
            $("#signUpSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#binSection").fadeIn(0);
                n();
            });
        } else if ($("#binSection").attr("data-sec") == "contribute") {
            $("#contributeSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#binSection").fadeIn(0);
                n();
            });
        } else if ($("#binSection").attr("data-sec") == "index-banner") {
            $("#index-banner").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#binSection").fadeIn(0);
                n();
            });
        }
    //$("#binSection").append("<div class='col s1' id='sideBarComments'>")
    });

//============================================================================

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

//=========================================================================

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

//==========================================================================

    $("body").on('mouseover', '.xbuttonIcon', function(event) {
        $("#sideBarComments").addClass("hoverable");
    });
    $("body").on('click', '.contributeButton', function(event) {
        event.preventDefault();
        $("#binSection").attr("data-sec", "contribute");
        $("#signUpSection").attr("data-sec", "contribute");
        $("#index-banner").attr("data-sec", "contribute");
        if ($("#contributeSection").attr("data-sec") == "signUp") {
            $("#signUpSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#contributeSection").fadeIn(0);
                n();
            });
        } else if ($("#contributeSection").attr("data-sec") == "bin") {
            $("#binSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#contributeSection").fadeIn(0);
                n();
            });
        } else if ($("#contributeSection").attr("data-sec") == "index-banner") {
            $("#index-banner").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#contributeSection").fadeIn(0);
                n();
            });
        }
    });

//====================================================================

    $("body").on('click', '.signUpButton', function(event) {
        event.preventDefault();
        $("#binSection").attr("data-sec", "signUp");
        $("#contributeSection").attr("data-sec", "signUp");
        $("#index-banner").attr("data-sec", "signUp");
        if ($("#signUpSection").attr("data-sec") == "contribute") {
            $("#contributeSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#signUpSection").fadeIn(0);
                n();
            });
        } else if ($("#signUpSection").attr("data-sec") == "bin") {
            $("#binSection").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#signUpSection").fadeIn(0);
                n();
            });
        } else if ($("#signUpSection").attr("data-sec") == "index-banner") {
            $("#index-banner").hide("slide", 2000)
            .delay(0)
            .queue(function(n) {
                $("#signUpSection").fadeIn(0);
                n();
            });
        }
    });

//=======================================================================

    $("body").on('click', '#logo-container', function(event) {
        event.preventDefault();
        $("#binSection").attr("data-sec", "index-banner");
        $("#contributeSection").attr("data-sec", "index-banner");
        $("#signUpSection").attr("data-sec", "index-banner");
        $("#index-banner").show("slide", 2000);
        $("#binSection").css('display', 'none');
        $("#signUpSection").css('display', 'none');
        $("#contributeSection").css('display', 'none');
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

//========================================================================

    $('.scrollspy').scrollSpy();

});    
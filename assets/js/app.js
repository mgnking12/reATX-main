$(document).ready(function() {

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 17
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

         // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        });

        function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location, 
                map: map
            });
        }

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');

    }


    $("body").on('click', '.binButton', function(event) {
    	 initMap();
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


    $('.scrollspy').scrollSpy();
});




  $(document).ready(function(){


function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

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
	event.preventDefault();
	initMap();
	console.log("bins")
	$("#contributeSection").attr("data-sec", "bin");
	$("#signUpSection").attr("data-sec", "bin");
	$("#index-banner").attr("data-sec", "bin");
	if ($("#binSection").attr("data-sec") == "signUp") {
	$("#signUpSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#binSection").fadeIn(0);
			n();
		});
	}else if ($("#binSection").attr("data-sec") == "contribute") {
	$("#contributeSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#binSection").fadeIn(0);
			n();
		});
	}else if ($("#binSection").attr("data-sec") == "index-banner") {
	$("#index-banner").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#binSection").fadeIn(0);
			n();
		});
	}
	//$("#binSection").append("<div class='col s1' id='sideBarComments'>")
});
$("body").on('click', '#sideBarComments', function(event) {
	event.preventDefault();
	$("#sideBarComments").animate({
		marginTop: '0%',
		//marginLeft: '-30%',
            width: '40%',
            height: '400px',
            borderRadius: '0%',
            backgroundColor: '#2980b9',
             backgroundColor:'rgba(41, 128, 185, 0.6)',
        }, 1000);
	$( "#sideBarComments" ).removeClass( "valign-wrapper push-s9 push-m11 hoverable" );
	$("#sideBarComments").addClass('push-s7');
	$(".bbuttonIcon").css('display', 'none');
	$(".xbuttonIcon").css('display', 'inline-block');
	$(".popout").css({
		display: 'block',
		opacity: '1'
	});
});
$("body").on('click', '.contributeButton', function(event) {
	event.preventDefault();
	$("#binSection").attr("data-sec", "contribute");
	$("#signUpSection").attr("data-sec", "contribute");
	$("#index-banner").attr("data-sec", "contribute");
	if ($("#contributeSection").attr("data-sec") == "signUp") {
	$("#signUpSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#contributeSection").fadeIn(0);
			n();
		});
	}else if ($("#contributeSection").attr("data-sec") == "bin") {
	$("#binSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#contributeSection").fadeIn(0);
			n();
		});
	}else if ($("#contributeSection").attr("data-sec") == "index-banner") {
	$("#index-banner").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
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
	$("#contributeSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#signUpSection").fadeIn(0);
			n();
		});
	}else if ($("#signUpSection").attr("data-sec") == "bin") {
	$("#binSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#signUpSection").fadeIn(0);
			n();
		});
	}else if ($("#signUpSection").attr("data-sec") == "index-banner") {
	$("#index-banner").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
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
	$("#index-banner").show( "slide", 2000);
			$("#binSection").css('display', 'none');
			$("#signUpSection").css('display', 'none');
			$("#contributeSection").css('display', 'none');
});


    $('.scrollspy').scrollSpy();
  });
        
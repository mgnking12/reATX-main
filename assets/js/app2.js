var binSec = '<div class="fluid-container" id="binSection" data-sec="index-banner"><div id="map"></div>';
var conSec = '<div class="fluid-container" id="contributeSection" data-sec="index-banner"><div id="map"></div></div>';
var signUpSec = ' <div class="fluid-container binHide" id="signUpSection" data-sec="index-banner"><div class="section"><div class="row"><div class="col s12 center"><h3><i class="mdi-content-send brown-text"></i></h3><h4>Sign Up</h4><p class="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p></div></div></div><div class="parallax-container valign-wrapper"><div class="section no-pad-bot"><div class="container"><div class="row center"></div></div></div><div class="parallax"><img src="assets/img/background3.jpg" alt="Unsplashed background img 3"></div></div></div>';
var pU = '<div class="row popupBins"><div  id="sideBarComments" class="col s12 push-s9 push-m11 hoverable circle valign-wrapper right"><div class="xbuttonIcon"><i class="fa fa-times fa-2x xbi"></i></div><i class="material-icons small valign bbuttonIcon">view_list</i><ul class="collapsible popout" data-collapsible="accordion"><li><div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li><li><div class="collapsible-header"><i class="material-icons">place</i>Second</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li><li><div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li></ul></div></div>';
var hPage = '<div id="index-banner" class="parallax-container binHide"><div class="section no-pad-bot"> <div class="container white-bg"> <br><br><h1 class="header center green-text text-darken-2">re<i class="fa fa-recycle" aria-hidden="true"></i>USTIN<div class="row center"><h5 class="header col s12 green-text light text-darken-2">r e d u c e  .  r e u s e  .  r e c y c l e</h5></div></h1><div class="row center"><a href="#" class="btn-large waves-effect waves-light green binButton">Search for Bins</a></div><br><br></div></div><div class="parallax"><img src="assets/img/background1.jpg" alt="Unsplashed background img 1"></div></div>';
$(document).ready(function() {

    var data = new Firebase("https://reaustin.firebaseio.com/");
    $(".all").html(hPage);
    //=====================================================================
    function initBinMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
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

        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
            google.maps.event.addListener(marker, "click", function() {
                infowindow.open(map, marker);
            });
        });

        function placeMarker(location) {
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }

        var html = "<div id='iw-container'>" + "<div class='iw-title'>Add your bin</div>" + "<table id='map-popup' class='iw-content'>" +
            "<tr><td class='iw-subTitle'>Your Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
            "<tr><td class='iw-subTitle'>Type of Bin:</td> <td><select id='binType' style='display: block'>" +
            "<option value='publicBin'>Public Bin</option>" +
            "<option value='privateBin'>Private Bin</option>" +
            "</select> </td></tr>" +
            "<tr><td class='iw-subTitle'>Additional Comments:</td> <td><input type='text' id='comments'/> </td></tr>" +
            "<tr><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>" + "<div class='iw-bottom-gradient'></div></table></div>" ;

        infowindow = new google.maps.InfoWindow({
            content: html,
        });



        //===================table style=====================



        google.maps.event.addListener(infowindow, 'domready', function() {

            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            /* Since this div is in a position prior to .gm-div style-iw.
             * We use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
             */
            var iwBackground = iwOuter.prev();

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({
                'display': 'none'
            });

            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({
                'display': 'none'
            });

            // Moves the infowindow 115px to the right.
            iwOuter.parent().parent().css({
                left: '115px'
            });

            // Moves the shadow of the arrow 76px to the left margin.
            iwBackground.children(':nth-child(1)').attr('style', function(i, s) {
                return s + 'left: 76px !important;'
            });

            // Moves the arrow 76px to the left margin.
            iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
                return s + 'left: 76px !important;'
            });

            // Changes the desired tail shadow color.
            iwBackground.children(':nth-child(3)').find('div').children().css({
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
            });

            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.css({
                opacity: '1',
                right: '60px',
                top: '25px',
                //border: '7px solid #48b5e9',
                'border-radius': '13px',
                //'box-shadow': '0 0 1px #3990B9'
            });

            // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
            if ($('.iw-content').height() < 140) {
                $('.iw-bottom-gradient').css({
                    display: 'none'
                });
            }

            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
            iwCloseBtn.mouseout(function() {
                $(this).css({
                    opacity: '1'
                });
            });
        });

        google.maps.event.addDomListener(window, 'load', initContributeMap);
    }


    //======================================================================

    //Function to pull up table for the marker


    function saveData() {
        var name = $("#name").val().trim();
        var type = $("#type").val().trim();
        var latlng = marker.getPosition();

        data.push({
            name: name,
            type: type,
            position: latlng,
            dateAdded: Firebase.ServerValue.TIMESTAMP
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
            $(".all").html(binSec).show(200, function() {
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
            $(".all").html(conSec).show(200, function() {
                initContributeMap();
            });;
        });
    });



    //========================signUpSection===========================
    $("body").on('click', '.signUpButton', function(event) {
        event.preventDefault();
        $(".all").hide(800, function() {
            $(".all").html(signUpSec).show(200, function() {});;
        });
    });

    //===========================homePage==============================
    $("body").on('click', '#logo-container', function(event) {
        event.preventDefault();
        $(".all").hide(800, function() {
            $(".all").html(hPage).show(200, function() {});;
        });
    });

    $('.scrollspy').scrollSpy();
});
var binSec = '<div class="fluid-container" id="binSection" data-sec="index-banner"><div id="map"></div>';
var conSec = '<div class="fluid-container" id="contributeSection" data-sec="index-banner"><div id="map"></div></div>';
var abtUsSec = ' <div class="fluid-container binHide" id="abtUsSection" data-sec="index-banner"><div class="section"><div class="row"><div class="col s12 center"><img src="assets/img/about.png" style="width: 700px"></div></div></div>';
var pU = '<div class="row popupBins"><div  id="sideBarComments" class="col s12 push-s9 push-m11 hoverable circle valign-wrapper right"><div class="xbuttonIcon"><i class="fa fa-times fa-2x xbi"></i></div><i class="material-icons small valign bbuttonIcon">view_list</i><ul class="collapsible popout" data-collapsible="accordion"><li><div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li><li><div class="collapsible-header"><i class="material-icons">place</i>Second</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li><li><div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div><div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li></ul></div></div>';
var hPage = '<div id="index-banner" class="parallax-container binHide"><div class="section no-pad-bot"> <div class="container white-bg"> <br><br><h1 class="header center green-text text-darken-2">re<i class="fa fa-recycle" aria-hidden="true"></i>USTIN<div class="row center"><h5 class="header col s12 green-text light text-darken-2">r e d u c e  .  r e u s e  .  r e c y c l e</h5></div></h1><div class="row center"><a href="#" class="btn-large waves-effect waves-light green binButton">Search for Bins</a></div><br><br></div></div><div class="parallax"><img src="assets/img/background1.jpg" alt="Unsplashed background img 1"></div></div>';
var userMarker = [];

$(document).ready(function() {

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
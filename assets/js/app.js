
  $(document).ready(function(){

$("body").on('click', '.binButton', function(event) {
	event.preventDefault();
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
});
$("body").on('click', '.contributeButton', function(event) {
	event.preventDefault();
	$("#contributeSection").data("sec", "contribute");
	$("#binSection").data("sec", "contribute");
	$("#index-banner").data("sec", "contribute");
	if ("data-sec" == "bin") {
	$("#binSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#contributeSection").fadeIn(0);
			n();
		});
	}else if ("data-sec" == "signUp") {
	$("#signUpSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#contributeSection").fadeIn(0);
			n();
		});
	}else if ("data-sec" == "index-banner") {
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
	$("#contributeSection").data("sec", "signUp");
	$("#binSection").data("sec", "signUp");
	$("#index-banner").data("sec", "signUp");
	if ("data-sec" == "bin") {
	$("#binSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#signUpSection").fadeIn(0);
			n();
		});
	}else if ("data-sec" == "contribute") {
	$("#contributeSection").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#signUpSection").fadeIn(0);
			n();
		});
	}else if ("data-sec" == "index-banner") {
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
	$("#contributeSection").data("sec", "index-banner");
	$("#binSection").data("sec", "index-banner");
	$("#signUpSection").data("sec", "index-banner");
	$("#index-banner").show( "slide", 2000);
			$("#binSection").css('display', 'none');
			$("#signUpSection").css('display', 'none');
			$("#contributeSection").css('display', 'none');
});


    $('.scrollspy').scrollSpy();
  });
        
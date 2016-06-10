
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
        
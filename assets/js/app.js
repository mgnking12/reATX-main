
  $(document).ready(function(){

$("body").on('click', '.bin-button', function(event) {
	event.preventDefault();
	$("#index-banner").hide( "slide", 2000)
	.delay(0)
		.queue(function(n){
			$("#binSection").fadeIn(0);
			n();
		});
});
$("body").on('click', '#logo-container', function(event) {
	event.preventDefault();
	$("#index-banner").show( "slide", 2000);
			$("#binSection").css('display', 'none', 2000);
});


    $('.scrollspy').scrollSpy();
  });
        
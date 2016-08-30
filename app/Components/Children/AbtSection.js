var React = require('react');

var AbtSection = React.createClass(

	render: function(){

        return ( 
            <div className="fluid-container binHide" id="abtUsSection" data-sec="index-banner"> 
            <div className="section"> 
            <div className="row"> 
            <div className="col s12 center"> 
            <img src="assets/img/about.png" style="width: 700px"></img>
            </div>
            </div> 
            </div>
            </div>
        )
    });
module.exports = AbtSection;
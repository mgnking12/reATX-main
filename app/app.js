// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/AbtSection');
var Results = require('./Children/Bins');
var History = require('./Children/Contribute');
// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

    // Here we set a generic state associated with the number of clicks
    getInitialState: function() {
        return {
            searchTerm: "",
            results: ""
        }
    },

    // We use this function to allow children to update the parent with searchTerms.
    setTerm: function(term) {
        this.setState({
            searchTerm: term
        })
    },

    // If the component updates we'll run this code
    componentDidUpdate: function(prevProps, prevState) {

        if (prevState.searchTerm != this.state.searchTerm) {
            console.log("UPDATED");

            helpers.runQuery(this.state.searchTerm)
                .then(function(data) {
                    if (data != this.state.results) {
                        console.log("HERE");
                        console.log(data);

                        this.setState({
                            results: data
                        })
                    }


                    // This code is necessary to bind the keyword "this" when we say this.setState 
                    // to actually mean the component itself and not the runQuery function.
                }.bind(this))
        }
    },

    // Here we render the function
    render: function() {

        return (

            < div className = "container" >

            < div className = "row" >

            < div className = "jumbotron" >
            < h2 className = "text-center" > Address Finder! < /h2> < p className = "text-center" > < em > Enter a landmark to search
            for its exact address(ex: "Eiffel Tower"). < /em></p >
            < /div>

            < div className = "col-md-6" >

            < Form setTerm = { this.setTerm }
            />

            < /div>

            < div className = "col-md-6" >

            < Results address = { this.state.results }
            />

            < /div>


            < /div>

            < /div>
        )
    }
});

// Export the componen back for use in other files
module.exports = Main;
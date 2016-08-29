"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

export default class Modalpopup extends React.Component {
	constructor(props) {
		super(props);
	}


	ratingsCreator(){
		var that = this;
	    return Object.keys(that.props.ratings).map(function(key, index) { // (2)
	      return(<div className="Card">
					{key}
  					<div> Likes: {that.props.ratings[key].thumbsup} </div>
  					<div> Dislikes: {that.props.ratings[key].thumbsdown} </div> <br/>
				</div>); 
	    	});
	};


	handleClick(event){
		ReactDOM.unmountComponentAtNode(document.getElementById('modalMount'));
	};

	render() {
        return (<div id="myModal" className="modal">
  					<div id="finishContent" className="modal-content">
					    <span className="close" onClick={this.handleClick}>x</span>
					     {::this.ratingsCreator()}
				  	</div>
				</div>
        );
    }
};
"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import Superagent from 'superagent';

import GreetingCard from './GreetingCard';
import SearchBar from 'react-search-bar';

const baseURL = "http://api.spreadshirt.net/api/v1/shops/205909/designs?showFacets=false&spellcheck=true&sortOrder=desc&locale=de_DE&mediaType=json&limit=20";


const Carousel = React.createClass ({


	getInitialState(){
		return {
		    photos: []
		}
	},

	cardsCreator() {
    return this.state.photos.map(function(photo, index) { // (2)
      return(<div className="GreetingCard">
				<GreetingCard image={photo} />
			</div>); 
    	});
  	},

  	searchHandler(designs){
  		var newPhotos = [];
  		designs.map(function(design, index) {
  			newPhotos.push(design.resources[0].href);
  		});
  		this.setState({photos: newPhotos});
  	},

  	loadNext(index, elem){
  		if(index===19){

  		}
  	},


    render() {
        return (<div>
	        		<SearchBox searchHandler={this.searchHandler} key={this.state.photos} />
		            <ReactSwipe className="carousel" key={this.state.photos.length} swipeOptions={{continuous: false, callback: function(index, elem) {}}}>
		                {::this.cardsCreator()}
		            </ReactSwipe>
	            </div>
        );
    }
});


var SearchBox = React.createClass({
	getInitialState(){
		return {
	    	offset:10,
	    	input:"test"
		}
	},

	httpGet(){
	    var xmlHttp = new XMLHttpRequest();
	    var query = baseURL+"&query=${input}"+"&offset=${offset}";
	    xmlHttp.open( "GET", query, false ); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	},

  	handleChange(event) {
  		this.setState({input: event.target.value});
  	},

    handleSearch(input) {
  		this.props.searchHandler(JSON.parse(this.httpGet()).designs);
  	},

    render:function(){
        return (
        	<div >
	        	<input type="text" ref="searchInput" placeholder="Search Name" value={this.props.query} onChange={this.handleChange} />
	        	<button type="button" onClick={this.handleSearch}> KLICK MICH</button>
	        </div>
        )
    }
});

ReactDOM.render(
    <Carousel />,
    document.getElementById('mount')
);

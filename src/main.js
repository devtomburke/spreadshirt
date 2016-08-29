"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import Superagent from 'superagent';

import Card from './Card';
import SearchBar from 'react-search-bar';

const limit = 20;
const baseURL = "http://api.spreadshirt.net/api/v1/shops/205909/designs?showFacets=false&spellcheck=true&sortOrder=desc&locale=de_DE&mediaType=json&limit="+limit;


const Carousel = React.createClass ({


	getInitialState(){
		return {
		    photos: [],
		    offset: 0,
		    currentCard:0,
		    input:""
		}
	},

	cardsCreator() {
    return this.state.photos.map(function(photo, index) { // (2)
      return(<div className="Card">
				<Card image={photo} />
			</div>); 
    	});
  	},

  	searchHandler(designs, input){
  		var newPhotos = this.state.photos;
  		designs.map(function(design, index) {
  			newPhotos.push(design.resources[0].href);
  		});
  		console.log(input+"|"+this.state.input);
  		this.setState({photos: newPhotos, input: input});
  	},

  	loadNext(index, elem){
  		if(index===(limit+this.state.offset-1)){
			this.setState({offset: this.state.offset+limit, currentCard: index});
  		}
  	},


    render() {
        return (<div>
	        		<SearchBox searchHandler={this.searchHandler} key={this.state.photos} offset={this.state.offset} input={this.state.input}/>
		            <ReactSwipe className="carousel" key={this.state.photos.length} swipeOptions={{continuous: false, startSlide:this.state.currentCard, callback: this.loadNext}}>
		                {::this.cardsCreator()}
		            </ReactSwipe>
	            </div>
        );
    }
});


var SearchBox = React.createClass({
	getInitialState(){
		return {
	    	input:this.props.input,
	    	offset: 0
		}
	},

	httpGet(){
	    var xmlHttp = new XMLHttpRequest();
	    var query = baseURL+'&query='+this.state.input+'&offset='+this.state.offset;
	    xmlHttp.open( "GET", query, false ); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	},

	componentWillReceiveProps(nextProps){
		if(nextProps.offset > this.props.offset){
			this.setState({offset: nextProps.offset});
		}

	},

  	handleChange(event) {
  		this.setState({input: event.target.value});
  		console.log(this.state.input);
  	},

    handleSearch(input) {
  		this.props.searchHandler(JSON.parse(this.httpGet()).designs, this.state.input);
  	},

  	componentDidUpdate(prevProps, prevState){
		if(this.props.offset > prevProps.offset){
			this.props.searchHandler(JSON.parse(this.httpGet()).designs, this.state.input);
		}
  	},


    render:function(){
        return (
        	<div >
	        	<input type="text" ref="searchInput" placeholder="Search Name" value={this.state.input} onChange={this.handleChange} />
	        	<button id="searchBtn" type="button" onClick={this.handleSearch}> KLICK MICH</button>
	        </div>
        )
    }
});

ReactDOM.render(
    <Carousel />,
    document.getElementById('mount')
);

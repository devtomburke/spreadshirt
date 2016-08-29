"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import Superagent from 'superagent';

import Card from './Card';
import SearchBar from 'react-search-bar';
import Modal from './Modalpopup';
import styles from './styles/styles.css';

const limit = 20;
const baseURL = "http://api.spreadshirt.net/api/v1/shops/205909/designs?showFacets=false&spellcheck=true&sortOrder=desc&locale=de_DE&mediaType=json&limit="+limit;
var ratings = {};

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
		var that = this;
	    return this.state.photos.map(function(photo, index) { // (2)
	      return(<div className="Card">
					<Card image={photo} ratingHandler={that.ratingHandler} keyword={that.state.input}/>
				</div>); 
	    	});
  	},

  	searchHandler(designs, input){
  		var newPhotos = this.state.photos;
  		designs.map(function(design, index) {
  			newPhotos.push(design.resources[0].href);
  		});
  		this.setState({photos: newPhotos, input: input});
  		if(ratings[input] == null){
  			ratings[input] ={};
  			ratings[input].thumbsup=0;
  			ratings[input].thumbsdown=0;
  		}
  	},

  	loadNext(index, elem){
  		this.setState({currentCard: index});
  		if(index===(limit+this.state.offset-1)){
			this.setState({offset: this.state.offset+limit});
  		}
  	},

  	ratingHandler(rating, key){

  		if(rating.localeCompare("thumbup")==0){
			ratings[key].thumbsup++;
  		}else{
  			ratings[key].thumbsdown++;
  		}
  	},

  	finishRating(){
  		ReactDOM.render(<Modal ratings={ratings}/>,document.getElementById('modalMount')
);
  	},


    render() {
    	var finishBtnStyle = {position: "fixed",
		    zIndex: 100, 
		    bottom: 0, 
		    left: 0,
		    width: "100%"
		}
        return (<div>
	        		<SearchBox searchHandler={this.searchHandler} key={this.state.photos} offset={this.state.offset} input={this.state.input}/>
		            <ReactSwipe className="carousel" key={this.state.photos.length} swipeOptions={{continuous: false, startSlide:this.state.currentCard, callback: this.loadNext}}>
		                {::this.cardsCreator()}
		            </ReactSwipe>
		            <button id="finishBtn" type="button" onClick={this.finishRating} style={finishBtnStyle}> Finish Rating</button>
		            <div id="modalMount"></div>
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
	        	<button id="searchBtn" type="button" onClick={this.handleSearch}> Search</button>
	        </div>
        )
    }
});

ReactDOM.render(
    <Carousel />,
    document.getElementById('mount')
);
